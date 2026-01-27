import React from 'react'
import { ChevronDownIcon } from 'lucide-react'

function Select({ label, error, options, placeholder, className = '', id, ...props }) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          className={`
            w-full px-4 py-2.5 rounded-lg appearance-none
            bg-surface-dark border border-slate-600
            text-white
            focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>

      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  )
}

export { Select }