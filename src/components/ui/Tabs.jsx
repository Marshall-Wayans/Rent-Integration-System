import React, { useState, Children, cloneElement, isValidElement } from 'react'
import { motion } from 'framer-motion'

function Tabs({ tabs, defaultTab, onChange, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs[0] && tabs[0].id))

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    if (onChange) onChange(tabId)
  }

  return (
    <div>
      <div className="flex gap-1 p-1 bg-surface-dark rounded-lg border border-slate-700/50 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
              transition-colors duration-200
              ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
            `}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary-600 rounded-md"
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { activeTab })
        }
        return child
      })}
    </div>
  )
}

function TabPanel({ tabId, activeTab, children }) {
  if (tabId !== activeTab) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export { Tabs, TabPanel }