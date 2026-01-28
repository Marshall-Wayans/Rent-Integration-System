import React from 'react'

const Input = React.forwardRef(
  ({ label, error, hint, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label && label.toLowerCase().replace(/\s+/g, '-'))
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full px-4 py-2.5 rounded-lg
              bg-surface-dark border border-slate-600
              text-white placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-sm text-slate-500">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
