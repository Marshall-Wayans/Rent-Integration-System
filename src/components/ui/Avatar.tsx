import React from 'react'

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getColorFromName(name) {
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-cyan',
    'bg-accent-mint',
    'bg-purple-500',
    'bg-pink-500',
  ]
  const index = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

function Avatar({ src, name, size = 'md', className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeStyles[size]} rounded-full object-cover ring-2 ring-slate-700 ${className}`}
      />
    )
  }
  return (
    <div
      className={`
        ${sizeStyles[size]} 
        ${getColorFromName(name)}
        rounded-full flex items-center justify-center font-semibold text-white
        ring-2 ring-slate-700
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  )
}

export { Avatar }
