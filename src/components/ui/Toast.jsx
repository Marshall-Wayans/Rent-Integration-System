import React from 'react'
import { Toaster } from 'sonner'

function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1e293b',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          color: '#f1f5f9',
        },
        className: 'shadow-glow-sm',
      }}
      richColors
    />
  )
}

export { ToastProvider }