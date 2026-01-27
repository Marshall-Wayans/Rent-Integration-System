import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlusIcon, SearchIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import { Avatar } from '../../components/ui/Avatar'
import { tenants } from '../../utils/mockData'
import { formatCurrency, formatPhone } from '../../utils/formatters'
const statusOptions = [
  {
    value: '',
    label: 'All Status',
  },
  {
    value: 'paid',
    label: 'Paid',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'overdue',
    label: 'Overdue',
  },
]
export function TenantsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || tenant.paymentStatus === statusFilter
    return matchesSearch && matchesStatus
  })
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'overdue':
        return <Badge variant="error">Overdue</Badge>
      default:
        return null
    }
  }
  const columns = [
    {
      key: 'name',
      header: 'Tenant',
      render: (tenant: (typeof tenants)[0]) => (
        <div className="flex items-center gap-3">
          <Avatar src={tenant.avatar} name={tenant.name} size="sm" />
          <div>
            <p className="font-medium text-white">{tenant.name}</p>
            <p className="text-sm text-slate-400">{tenant.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (tenant: (typeof tenants)[0]) => formatPhone(tenant.phone),
    },
    {
      key: 'property',
      header: 'Property',
      render: (tenant: (typeof tenants)[0]) => (
        <div>
          <p className="text-white">{tenant.propertyName}</p>
          <p className="text-sm text-slate-400">Unit {tenant.unitNumber}</p>
        </div>
      ),
    },
    {
      key: 'rentAmount',
      header: 'Rent',
      render: (tenant: (typeof tenants)[0]) =>
        formatCurrency(tenant.rentAmount),
    },
    {
      key: 'paymentStatus',
      header: 'Status',
      render: (tenant: (typeof tenants)[0]) =>
        getStatusBadge(tenant.paymentStatus),
    },
    {
      key: 'balance',
      header: 'Balance',
      render: (tenant: (typeof tenants)[0]) => (
        <span
          className={tenant.balance > 0 ? 'text-red-400' : 'text-emerald-400'}
        >
          {formatCurrency(tenant.balance)}
        </span>
      ),
    },
  ]
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tenants</h1>
          <p className="text-slate-400">Manage your tenants and their leases</p>
        </div>
        <Button leftIcon={<PlusIcon className="w-4 h-4" />}>Add Tenant</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search tenants..."
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

      {/* Table */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <Table
          columns={columns}
          data={filteredTenants}
          keyExtractor={(tenant) => tenant.id}
          onRowClick={(tenant) => navigate(`/tenants/${tenant.id}`)}
          emptyMessage="No tenants found"
        />
      </motion.div>
    </div>
  )
}
