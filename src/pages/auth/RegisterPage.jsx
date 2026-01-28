import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  BuildingIcon,
  HomeIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

function RegisterPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = react.useState(false)
  const [isLoading, setIsLoading] = react.useState(false)
  const [formData, setFormData] = react.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // owner or tenant
  })
  const [errors, setErrors] = react.useState({})

  function validateForm() {
    const newErrors = {}

    if (!formData.role) {
      newErrors.role = 'Please select a role'
    }

    if (!formData.name) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call
    setIsLoading(false)

    toast.success('Account created successfully!')
    navigate('/')
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Get started with RentFlow today"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  role: 'owner',
                })
              }
              className={`
                p-4 rounded-xl border-2 transition-all duration-200
                ${formData.role === 'owner' ? 'border-primary-500 bg-primary-500/10' : 'border-slate-600 hover:border-slate-500'}
              `}
            >
              <BuildingIcon
                className={`w-6 h-6 mx-auto mb-2 ${
                  formData.role === 'owner' ? 'text-primary-400' : 'text-slate-400'
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  formData.role === 'owner' ? 'text-white' : 'text-slate-300'
                }`}
              >
                Property Owner
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  role: 'tenant',
                })
              }
              className={`
                p-4 rounded-xl border-2 transition-all duration-200
                ${formData.role === 'tenant' ? 'border-primary-500 bg-primary-500/10' : 'border-slate-600 hover:border-slate-500'}
              `}
            >
              <HomeIcon
                className={`w-6 h-6 mx-auto mb-2 ${
                  formData.role === 'tenant' ? 'text-primary-400' : 'text-slate-400'
                }`}
              />
              <p
                className={`text-sm font-medium ${
                  formData.role === 'tenant' ? 'text-white' : 'text-slate-300'
                }`}
              >
                Tenant
              </p>
            </button>
          </div>
          {errors.role && (
            <p className="mt-1.5 text-sm text-red-400">{errors.role}</p>
          )}
        </div>

        <Input
          label="Full name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          error={errors.name}
          leftIcon={<UserIcon className="w-5 h-5" />}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={errors.email}
          leftIcon={<MailIcon className="w-5 h-5" />}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
          hint="Must be at least 8 characters"
          leftIcon={<LockIcon className="w-5 h-5" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          }
        />

        <Input
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
          leftIcon={<LockIcon className="w-5 h-5" />}
        />

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Create account
        </Button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export { RegisterPage }