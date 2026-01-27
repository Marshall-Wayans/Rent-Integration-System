import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'
import { Card } from '../ui/Card'

export function StatCard({
  title,
  value,
  icon,
  trend,
  variant = 'default',
  delay = 0,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay,
        duration: 0.3,
      }}
    >
      <Card variant={variant} className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-white">
              {value}
            </p>

            {trend && (
              <div
                className={`flex items-center gap-1 mt-2 text-sm ${
                  trend.isPositive
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {trend.isPositive ? (
                  <TrendingUpIcon className="w-4 h-4" />
                ) : (
                  <TrendingDownIcon className="w-4 h-4" />
                )}
                <span>
                  {Math.abs(trend.value)}% from last month
                </span>
              </div>
            )}
          </div>

          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}