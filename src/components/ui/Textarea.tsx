import React from 'react'

function Textarea({ label, error, hint, className = '', id, ...props }) {
  const textareaId = id || (label && label.toLowerCase().replace(/\s+/g, '-'))

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-slate-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-2.5 rounded-lg resize-none
          bg-surface-dark border border-slate-600
          text-white placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-sm text-slate-500">{hint}</p>}
    </div>
  )
}

export { Textarea }