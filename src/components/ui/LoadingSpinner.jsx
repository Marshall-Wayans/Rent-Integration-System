import React from 'react'
import { motion } from 'framer-motion'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-primary-500/30 border-t-primary-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner />
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-surface-slate rounded-xl border border-slate-700/50 p-6 animate-pulse">
      <div className="h-4 bg-slate-700 rounded w-1/3 mb-4" />
      <div className="h-8 bg-slate-700 rounded w-1/2 mb-2" />
      <div className="h-3 bg-slate-700 rounded w-2/3" />
    </div>
  )
}

function SkeletonTable() {
  return (
    <div className="bg-surface-slate rounded-xl border border-slate-700/50 overflow-hidden animate-pulse">
      <div className="h-12 bg-surface-dark border-b border-slate-700/50" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-16 border-b border-slate-700/50 flex items-center px-6 gap-4"
        >
          <div className="h-4 bg-slate-700 rounded w-1/4" />
          <div className="h-4 bg-slate-700 rounded w-1/3" />
          <div className="h-4 bg-slate-700 rounded w-1/5" />
        </div>
      ))}
    </div>
  )
}

export { LoadingSpinner, PageLoader, SkeletonCard, SkeletonTable }