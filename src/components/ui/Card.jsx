import React from 'react'
import { motion } from 'framer-motion'

const variantStyles = {
  default: 'bg-surface-slate border border-slate-700/50',
  'gradient-indigo':
    'bg-gradient-to-br from-primary-700/30 to-primary-900/30 border border-primary-500/20',
  'gradient-teal':
    'bg-gradient-to-br from-secondary-600/30 to-secondary-800/30 border border-secondary-500/20',
  'gradient-cyan':
    'bg-gradient-to-br from-accent-cyan/20 to-primary-700/20 border border-accent-cyan/20',
  glass: 'glass',
}

function Card({ variant = 'default', className = '', children, hover = false, onClick }) {
  const Component = hover || onClick ? motion.div : 'div'
  const motionProps =
    hover || onClick
      ? {
          whileHover: {
            y: -2,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          },
          transition: {
            duration: 0.2,
          },
        }
      : {}
  return (
    <Component
      className={`
        rounded-xl shadow-card
        ${variantStyles[variant]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  )
}

function CardHeader({ className = '', children }) {
  return <div className={`px-6 py-4 border-b border-slate-700/50 ${className}`}>{children}</div>
}

function CardContent({ className = '', children }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

function CardFooter({ className = '', children }) {
  return <div className={`px-6 py-4 border-t border-slate-700/50 ${className}`}>{children}</div>
}

export { Card, CardHeader, CardContent, CardFooter }
