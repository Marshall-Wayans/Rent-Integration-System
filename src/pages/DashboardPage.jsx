import React from 'react'
import { motion } from 'framer-motion'
import {
  BuildingIcon,
  UsersIcon,
  DollarSignIcon,
  ClockIcon,
  WrenchIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { StatCard } from '../components/dashboard/StatCard'
import { RevenueChart } from '../components/dashboard/RevenueChart'
import { PaymentStatusChart } from '../components/dashboard/PaymentStatusChart'
import { OccupancyChart } from '../components/dashboard/OccupancyChart'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { dashboardStats } from '../utils/mockData'
import { formatCurrency } from '../utils/formatters'

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <MainStats />
      <SecondaryStats />
      <DashboardCharts />
    </div>
  )
}

function DashboardHeader() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="text-slate-400">
        Welcome back! Here's what's happening with your properties.
      </p>
    </div>
  )
}

function MainStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Properties"
        value={dashboardStats.totalProperties}
        icon={<BuildingIcon className="w-6 h-6" />}
        variant="gradient-indigo"
        delay={0}
      />
      <StatCard
        title="Total Tenants"
        value={dashboardStats.totalTenants}
        icon={<UsersIcon className="w-6 h-6" />}
        variant="gradient-teal"
        trend={{ value: 12, isPositive: true }}
        delay={0.1}
      />
      <StatCard
        title="Monthly Revenue"
        value={formatCurrency(dashboardStats.monthlyRevenue)}
        icon={<DollarSignIcon className="w-6 h-6" />}
        variant="gradient-cyan"
        trend={{ value: 8, isPositive: true }}
        delay={0.2}
      />
      <StatCard
        title="Occupancy Rate"
        value={`${dashboardStats.occupancyRate}%`}
        icon={<TrendingUpIcon className="w-6 h-6" />}
        variant="default"
        trend={{ value: 3, isPositive: false }}
        delay={0.3}
      />
    </div>
  )
}

function SecondaryStatsCard({
  icon,
  value,
  label,
  delay,
  bgColor,
  iconColor,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-slate rounded-xl border border-slate-700/50 p-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          {React.cloneElement(icon, {
            className: `w-5 h-5 ${iconColor}`,
          })}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-slate-400">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}

function SecondaryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SecondaryStatsCard
        icon={<ClockIcon />}
        value={dashboardStats.pendingPayments}
        label="Pending Payments"
        delay={0.4}
        bgColor="bg-amber-500/20"
        iconColor="text-amber-400"
      />
      <SecondaryStatsCard
        icon={<DollarSignIcon />}
        value={dashboardStats.overduePayments}
        label="Overdue Payments"
        delay={0.5}
        bgColor="bg-red-500/20"
        iconColor="text-red-400"
      />
      <SecondaryStatsCard
        icon={<WrenchIcon />}
        value={dashboardStats.openMaintenanceRequests}
        label="Open Requests"
        delay={0.6}
        bgColor="bg-cyan-500/20"
        iconColor="text-cyan-400"
      />
    </div>
  )
}

function DashboardCharts() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RecentActivity />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentStatusChart />
        <OccupancyChart />
      </div>
    </>
  )
}
