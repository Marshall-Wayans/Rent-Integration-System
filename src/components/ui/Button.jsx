import React from 'react'
import { motion } from 'framer-motion'
import { Loader2Icon } from 'lucide-react'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-500 hover:to-primary-400 shadow-glow-sm hover:shadow-glow',
  secondary:
    'bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-500 hover:to-secondary-400',
  danger:
    'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400',
  ghost:
    'bg-transparent text-slate-300 hover:bg-surface-hover hover:text-white',
  outline:
    'bg-transparent border border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2Icon className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon || null
      )}
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  )
}

export { Button }
