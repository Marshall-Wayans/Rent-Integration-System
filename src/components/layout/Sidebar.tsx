import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboardIcon,
  BuildingIcon,
  UsersIcon,
  CreditCardIcon,
  WrenchIcon,
  SettingsIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  HomeIcon,
} from 'lucide-react'

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" /> },
    { path: '/properties', label: 'Properties', icon: <BuildingIcon className="w-5 h-5" /> },
    { path: '/tenants', label: 'Tenants', icon: <UsersIcon className="w-5 h-5" /> },
    { path: '/payments', label: 'Payments', icon: <CreditCardIcon className="w-5 h-5" /> },
    { path: '/invoices', label: 'Invoices', icon: <FileTextIcon className="w-5 h-5" /> },
    { path: '/maintenance', label: 'Maintenance', icon: <WrenchIcon className="w-5 h-5" /> },
  ]

  const bottomNavItems = [
    { path: '/notifications', label: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ]

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-surface-slate to-surface-dark border-r border-slate-700/50 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">RentFlow</span>
            </motion.div>
          )}
        </AnimatePresence>
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isCollapsed={isCollapsed}
            isActive={
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path))
            }
          />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-3 space-y-1 border-t border-slate-700/50">
        {bottomNavItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            isCollapsed={isCollapsed}
            isActive={location.pathname === item.path}
          />
        ))}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-surface-slate border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-500 transition-all"
      >
        {isCollapsed ? (
          <ChevronRightIcon className="w-4 h-4" />
        ) : (
          <ChevronLeftIcon className="w-4 h-4" />
        )}
      </button>
    </motion.aside>
  )
}

function NavItem({ item, isCollapsed, isActive }) {
  return (
    <NavLink
      to={item.path}
      className={`
        relative flex items-center gap-3 px-3 py-2.5 rounded-xl
        transition-all duration-200
        ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-surface-hover'}
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-primary-500/60 rounded-xl shadow-glow-sm"
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        />
      )}
      <span className="relative z-10">{item.icon}</span>
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="relative z-10 font-medium text-sm whitespace-nowrap"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  )
}

export { Sidebar, NavItem }
