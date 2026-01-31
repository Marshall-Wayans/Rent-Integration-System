import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import { tenants as mockTenants } from '../../utils/mockData'
import { formatCurrency } from '../../utils/formatters'

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'overdue', label: 'Overdue' },
]

export function TenantsPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [allTenants, setAllTenants] = useState([])

  // Load tenants when component mounts
  useEffect(() => {
    loadTenants()
  }, []) // Empty array means this runs once when component loads

  // Function to load tenants from localStorage and mockData
  const loadTenants = () => {
    // Get saved tenants from localStorage
    const savedTenants = JSON.parse(localStorage.getItem('tenants') || '[]')
    
    // Combine mock data with saved tenants
    const combined = [...mockTenants, ...savedTenants]
    
    // Update state
    setAllTenants(combined)
  }

  // Function to delete a tenant
  const handleDeleteTenant = (tenantId, e) => {
    e.stopPropagation() // Prevent row click when deleting
    
    // Ask for confirmation
    if (window.confirm('Are you sure you want to remove this tenant?')) {
      // Get saved tenants from localStorage
      const savedTenants = JSON.parse(localStorage.getItem('tenants') || '[]')
      
      // Remove the tenant with matching ID
      const updatedTenants = savedTenants.filter(tenant => tenant.id !== tenantId)
      
      // Save back to localStorage
      localStorage.setItem('tenants', JSON.stringify(updatedTenants))
      
      // Reload the tenants list
      loadTenants()
    }
  }

  const filteredTenants = allTenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || tenant.paymentStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
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
      render: (tenant) => (
        <div>
          <p className="font-medium text-white">{tenant.name}</p>
          <p className="text-sm text-slate-400">{tenant.email}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (tenant) => tenant.phone,
    },
    {
      key: 'property',
      header: 'Property',
      render: (tenant) => (
        <div>
          <p className="text-white">{tenant.propertyName}</p>
          <p className="text-sm text-slate-400">Unit {tenant.unitNumber}</p>
        </div>
      ),
    },
    {
      key: 'rentAmount',
      header: 'Rent',
      render: (tenant) => formatCurrency(tenant.rentAmount),
    },
    {
      key: 'paymentStatus',
      header: 'Status',
      render: (tenant) => getStatusBadge(tenant.paymentStatus),
    },
    {
      key: 'balance',
      header: 'Balance',
      render: (tenant) => (
        <span className={tenant.balance > 0 ? 'text-red-400' : 'text-emerald-400'}>
          {formatCurrency(tenant.balance)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (tenant) => {
        // Check if tenant is from localStorage (can be deleted)
        const savedTenants = JSON.parse(localStorage.getItem('tenants') || '[]')
        const canDelete = savedTenants.some(t => t.id === tenant.id)
        
        if (!canDelete) {
          return <span className="text-slate-500 text-sm">-</span>
        }
        
        return (
          <button
            onClick={(e) => handleDeleteTenant(tenant.id, e)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            title="Remove tenant"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        )
      },
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
        <Button 
          leftIcon={<PlusIcon className="w-4 h-4" />}
          onClick={() => navigate('/tenants/add')}
        >
          Add Tenant
        </Button>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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