import React, { useState } from 'react'
import { BellIcon, CheckIcon, CreditCardIcon, WrenchIcon, FileTextIcon, SettingsIcon } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'
import { notifications } from '../utils/mockData'
import { formatRelativeTime } from '../utils/formatters'

// Icon and color mappings
const iconMap = {
  payment: <CreditCardIcon className="w-5 h-5" />,
  maintenance: <WrenchIcon className="w-5 h-5" />,
  lease: <FileTextIcon className="w-5 h-5" />,
  system: <SettingsIcon className="w-5 h-5" />,
}

const colorMap = {
  payment: 'bg-emerald-500/20 text-emerald-400',
  maintenance: 'bg-amber-500/20 text-amber-400',
  lease: 'bg-primary-500/20 text-primary-400',
  system: 'bg-cyan-500/20 text-cyan-400',
}

function Header({ unreadCount, markAllAsRead }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <p className="text-slate-400">
          {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
        </p>
      </div>
      {unreadCount > 0 && (
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          <CheckIcon className="w-4 h-4 mr-2" />
          Mark all as read
        </Button>
      )}
    </div>
  )
}

function NotificationCard({ notification, markAsRead, deleteNotification }) {
  return (
    <Card className={`p-4 ${!notification.read ? 'border-l-4 border-l-primary-500' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[notification.type]}`}>
          {iconMap[notification.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={`font-medium ${notification.read ? 'text-slate-300' : 'text-white'}`}>
                {notification.title}
              </p>
              <p className="text-sm text-slate-400 mt-0.5">{notification.message}</p>
            </div>
            {!notification.read && <Badge variant="primary" size="sm">New</Badge>}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-slate-500">{formatRelativeTime(notification.createdAt)}</span>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                Mark as read
              </button>
            )}
            <button
              onClick={() => deleteNotification(notification.id)}
              className="text-xs text-slate-500 hover:text-red-400 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function NotificationsList({ notificationList, markAsRead, deleteNotification }) {
  if (notificationList.length === 0) {
    return (
      <EmptyState
        icon={<BellIcon className="w-8 h-8 text-primary-400" />}
        title="No notifications"
        description="You're all caught up! Check back later for updates."
      />
    )
  }

  return (
    <div className="space-y-3">
      {notificationList.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
        />
      ))}
    </div>
  )
}

function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6 max-w-3xl p-6">
      <Header unreadCount={unreadCount} markAllAsRead={markAllAsRead} />
      <NotificationsList
        notificationList={notificationList}
        markAsRead={markAsRead}
        deleteNotification={deleteNotification}
      />
    </div>
  )
}

export { NotificationsPage }
