import React from 'react'
import { motion } from 'framer-motion'
import { InboxIcon } from 'lucide-react'
import { Button } from './Button'

function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
        {icon || <InboxIcon className="w-8 h-8 text-primary-400" />}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-slate-400 max-w-sm mb-6">{description}</p>}
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </motion.div>
  )
}

export { EmptyState }