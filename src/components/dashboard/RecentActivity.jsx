import React from 'react'
import { motion } from 'framer-motion'
import {
  CreditCardIcon,
  WrenchIcon,
  UserPlusIcon,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { recentActivity } from '../../utils/mockData'

const iconMap = {
  payment: <CreditCardIcon className="w-4 h-4" />,
  maintenance: <WrenchIcon className="w-4 h-4" />,
  tenant: <UserPlusIcon className="w-4 h-4" />,
}

const colorMap = {
  payment: 'bg-emerald-500/20 text-emerald-400',
  maintenance: 'bg-amber-500/20 text-amber-400',
  tenant: 'bg-primary-500/20 text-primary-400',
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">
          Recent Activity
        </h3>
        <p className="text-sm text-slate-400">
          Latest updates across properties
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentActivity.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[activity.type]}`}
            >
              {iconMap[activity.type]}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">
                {activity.title}
              </p>
              <p className="text-sm text-slate-400 truncate">
                {activity.description}
              </p>
            </div>

            <span className="text-xs text-slate-500 whitespace-nowrap">
              {activity.time}
            </span>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}