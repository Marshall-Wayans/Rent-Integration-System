import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  SearchIcon,
  DollarSignIcon,
  ClockIcon,
  AlertCircleIcon,
  XCircleIcon,
} from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Table } from '../../components/ui/Table'
import { formatDate } from '../../utils/formatters'
// Import getAllInvoices from mockData (payments = invoices)
import { getAllInvoices } from '../../utils/mockData'

// Function to format amounts in Kenyan Shillings
const formatKES = (amount) => {
  return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'failed', label: 'Failed' },
]

export function PaymentsPage() {
  const navigate = useNavigate()
  
  // Get payments from mockData (payments are the same as invoices)
  const payments = getAllInvoices()
  
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Filter payments based on search query and status
  const filteredPayments = payments.filter((payment) => {
    const tenant = String(payment.tenantName ?? '')
    const property = String(payment.propertyName ?? '')

    const matchesSearch =
      tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !statusFilter || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Calculate totals for each status
  const totalCollected = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount ?? 0), 0)
    
  const totalPending = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + (p.amount ?? 0), 0)
    
  const totalOverdue = payments
    .filter((p) => p.status === 'overdue')
    .reduce((sum, p) => sum + (p.amount ?? 0), 0)

  // Function to display the correct status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'overdue':
        return <Badge variant="error">Overdue</Badge>
      case 'failed':
        return <Badge variant="error">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  // Define the columns for the payments table
  const columns = [
    {
      key: 'tenant',
      header: 'Tenant',
      render: (payment) => (
        <div>
          <p className="font-medium text-white">{payment.tenantName ?? '-'}</p>
          <p className="text-sm text-slate-400">
            {payment.propertyName ?? '-'} • Unit {payment.unitNumber ?? '-'}
          </p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (payment) => (
        <span className="font-semibold text-white">{formatKES(payment.amount ?? 0)}</span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (payment) => (payment.dueDate ? formatDate(payment.dueDate) : '-'),
    },
    {
      key: 'paidDate',
      header: 'Paid Date',
      render: (payment) => (payment.paidDate ? formatDate(payment.paidDate) : '-'),
    },
    {
      key: 'method',
      header: 'Method',
      render: (payment) => <span className="capitalize text-slate-300">{payment.method ?? '-'}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (payment) => getStatusBadge(payment.status),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Payments</h1>
        <p className="text-slate-400">Track and manage rent payments</p>
      </div>

      {/* Summary Cards showing totals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[totalCollected, totalPending, totalOverdue].map((amount, i) => {
          const icons = [
            <DollarSignIcon className="w-5 h-5 text-white" />,
            <ClockIcon className="w-5 h-5 text-amber-400" />,
            <AlertCircleIcon className="w-5 h-5 text-red-400" />,
          ]
          const bgColors = ['bg-white/20', 'bg-amber-500/20', 'bg-red-500/20']
          const labels = ['Collected', 'Pending', 'Overdue']
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant={i === 0 ? 'gradient-teal' : undefined} className="p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${bgColors[i]} flex items-center justify-center`}
                  >
                    {icons[i]}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{formatKES(amount)}</p>
                    <p className="text-sm text-slate-400">{labels[i]}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}

        {/* Failed payments card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
                <XCircleIcon className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-slate-400">Failed</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<SearchIcon className="w-5 h-5" />}
          />
        </div>
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-40"
        />
      </div>

      {/* Payments Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Table
          columns={columns}
          data={filteredPayments}
          keyExtractor={(payment) => payment.id ?? ''}
          onRowClick={(payment) => navigate(`/payments/${payment.id}`)}
          emptyMessage="No payments found"
        />
      </motion.div>
    </div>
  )
}