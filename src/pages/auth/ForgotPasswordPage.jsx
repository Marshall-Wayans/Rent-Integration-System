import React from 'react'
import { Link } from 'react-router-dom'
import { MailIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = react.useState(false)
  const [isSubmitted, setIsSubmitted] = react.useState(false)
  const [email, setEmail] = react.useState('')
  const [error, setError] = react.useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link"
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-8 h-8 text-emerald-400" />
          </div>

          <p className="text-slate-400 mb-6">
            We've sent a password reset link to{' '}
            <span className="text-white font-medium">{email}</span>. Please
            check your inbox and follow the instructions.
          </p>

          <Link to="/login">
            <Button variant="outline" className="w-full" size="lg">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to sign in
            </Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          leftIcon={<MailIcon className="w-5 h-5" />}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          Send reset link
        </Button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to sign in
        </Link>
      </form>
    </AuthLayout>
  )
}

export { ForgotPasswordPage }