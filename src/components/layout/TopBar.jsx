import React, { useEffect, useState, Fragment } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BellIcon,
  SearchIcon,
  ChevronRightIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { Avatar } from '../ui/Avatar'
import { notifications } from '../../utils/mockData'

const pathNames = {
  '/': 'Dashboard',
  '/properties': 'Properties',
  '/tenants': 'Tenants',
  '/payments': 'Payments',
  '/invoices': 'Invoices',
  '/maintenance': 'Maintenance',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
}

export function TopBar() {
  const location = useLocation()
  const navigate = useNavigate()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  // Dynamic user data from localStorage
  const [userData, setUserData] = useState({
    name: 'User',
    email: localStorage.getItem('userEmail') || 'user@example.com',
    role: 'owner',
    avatar: '',
  })

  // Load user data from localStorage
  useEffect(() => {
    const loadUserData = () => {
      const savedProfile = localStorage.getItem('userProfile')
      const savedPhoto = localStorage.getItem('userPhoto')
      const userEmail = localStorage.getItem('userEmail')

      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        setUserData((prev) => ({
          ...prev,
          name: profile.name || 'User',
          email: profile.email || userEmail || 'user@example.com',
        }))
      } else if (userEmail) {
        setUserData((prev) => ({
          ...prev,
          email: userEmail,
        }))
      }

      if (savedPhoto) {
        setUserData((prev) => ({
          ...prev,
          avatar: savedPhoto,
        }))
      }
    }

    loadUserData()

    const handleStorageChange = () => {
      loadUserData()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userDataUpdated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userDataUpdated', handleStorageChange)
    }
  }, [])

  const pathSegments = location.pathname.split('/').filter(Boolean)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('rememberMe')

    toast.success('Logged out successfully')
    navigate('/login')
  }

  const getBreadcrumbs = () => {
    const crumbs = [{ path: '/', label: 'Home' }]
    let currentPath = ''

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`

      const label =
        pathNames[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1)

      crumbs.push({
        path: currentPath,
        label,
      })
    })

    return crumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="h-16 bg-surface-slate/80 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.path}>
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-slate-500" />
            )}

            {index === breadcrumbs.length - 1 ? (
              <span className="text-white font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </Fragment>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-hover transition-colors">
          <SearchIcon className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}
            className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-surface-hover transition-colors"
          >
            <BellIcon className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-surface-slate rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-slate-700/30 hover:bg-surface-hover transition-colors cursor-pointer ${
                        !notification.read ? 'bg-primary-500/5' : ''
                      }`}
                    >
                      <p className="text-sm text-white font-medium">
                        {notification.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/notifications"
                  className="block px-4 py-3 text-center text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <Avatar src={userData.avatar} name={userData.name} size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">{userData.name}</p>
              <p className="text-xs text-slate-400 capitalize">
                {userData.role}
              </p>
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-56 bg-surface-slate rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <p className="font-medium text-white">{userData.name}</p>
                  <p className="text-sm text-slate-400">{userData.email}</p>
                </div>

                <div className="py-2">
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-surface-hover transition-colors"
                    onClick={() => setShowProfile(false)}
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-surface-hover transition-colors"
                    onClick={() => setShowProfile(false)}
                  >
                    <SettingsIcon className="w-4 h-4" />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-surface-hover transition-colors"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
