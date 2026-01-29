import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { toast } from 'sonner'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

// Valid credentials
const VALID_CREDENTIALS = {
  email: 'admin@rentflow.com',
  password: 'RentFlow2024!',
}

export function LoginPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials
    if (
      formData.email === VALID_CREDENTIALS.email &&
      formData.password === VALID_CREDENTIALS.password
    ) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', formData.email)

      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      }

      setIsLoading(false)
      toast.success('Welcome back!')
      navigate('/')
    } else {
      setIsLoading(false)
      toast.error('Invalid email or password')
      setErrors({
        email: 'Invalid credentials',
        password: 'Invalid credentials',
      })
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Demo Credentials Info */}
        <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-primary-400 mb-2">
            Demo Credentials:
          </p>
          <div className="space-y-1 text-xs text-slate-300">
            <p>
              <span className="text-slate-400">Email:</span> admin@rentflow.com
            </p>
            <p>
              <span className="text-slate-400">Password:</span> RentFlow2024!
            </p>
          </div>
        </div>

        <Input
          label="Email address"
          type="email"
          placeholder="admin@rentflow.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          error={errors.email}
          leftIcon={<MailIcon className="w-5 h-5" />}
          autoComplete="email"
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          error={errors.password}
          leftIcon={<LockIcon className="w-5 h-5" />}
          autoComplete="current-password"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-white transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rememberMe: e.target.checked,
                })
              }
              className="w-4 h-4 rounded border-slate-600 bg-surface-dark text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
            />
            <span className="text-sm text-slate-400">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          Sign in
        </Button>

        <p className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
