import React from 'react'
import { motion } from 'framer-motion'

function Table({ columns, data, keyExtractor, onRowClick, emptyMessage = 'No data available', isLoading = false }) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-700/50">
        <div className="bg-surface-slate">
          <div className="animate-pulse">
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
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-surface-slate">
        <div className="py-12 text-center text-slate-400">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-dark border-b border-slate-700/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-surface-slate divide-y divide-slate-700/50">
            {data.map((item, index) => (
              <motion.tr
                key={keyExtractor(item)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onRowClick && onRowClick(item)}
                className={onRowClick ? 'cursor-pointer hover:bg-surface-hover transition-colors' : ''}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 text-sm text-slate-300 ${column.className || ''}`}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { Table }
