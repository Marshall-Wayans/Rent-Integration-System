import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  HomeIcon,
  DollarSignIcon,
  FileTextIcon,
  WrenchIcon,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Tabs, TabPanel } from '../../components/ui/Tabs'
import { Table } from '../../components/ui/Table'
import { tenants as mockTenants, payments, maintenanceRequests } from '../../utils/mockData'
import { formatCurrency, formatDate } from '../../utils/formatters'

export function TenantDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tenant, setTenant] = useState(null)

  // Load tenant when component mounts
  useEffect(() => {
    // Get saved tenants from localStorage
    const savedTenants = JSON.parse(localStorage.getItem('tenants') || '[]')
    
    // Combine mock data with saved tenants
    const allTenants = [...mockTenants, ...savedTenants]
    
    // Find the tenant with matching ID
    const foundTenant = allTenants.find((t) => t.id === id)
    
    // Update state
    setTenant(foundTenant)
  }, [id]) // Runs when component loads or when ID changes

  const tenantPayments = payments.filter((p) => p.tenantId === id)
  const tenantMaintenance = maintenanceRequests.filter((m) => m.tenantId === id)

  if (!tenant) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Tenant not found</p>
        <Button variant="ghost" onClick={() => navigate('/tenants')} className="mt-4">
          Back to Tenants
        </Button>
      </div>
    )
  }

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

  const paymentColumns = [
    {
      key: 'invoiceId',
      header: 'Invoice',
      render: (payment) => `#${payment.invoiceId}`,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (payment) => formatCurrency(payment.amount),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (payment) => formatDate(payment.dueDate),
    },
    {
      key: 'paidDate',
      header: 'Paid Date',
      render: (payment) => (payment.paidDate ? formatDate(payment.paidDate) : '-'),
    },
    {
      key: 'status',
      header: 'Status',
      render: (payment) => getStatusBadge(payment.status),
    },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'payments', label: 'Payments', icon: <DollarSignIcon className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Maintenance', icon: <WrenchIcon className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileTextIcon className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/tenants')}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{tenant.name}</h1>
          <p className="text-slate-400">
            {tenant.propertyName} • Unit {tenant.unitNumber}
          </p>
        </div>
        <Badge
          variant={
            tenant.paymentStatus === 'paid'
              ? 'success'
              : tenant.paymentStatus === 'pending'
              ? 'warning'
              : 'error'
          }
          size="md"
        >
          {tenant.paymentStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <DollarSignIcon className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatCurrency(tenant.rentAmount)}</p>
              <p className="text-sm text-slate-400">Monthly Rent</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <DollarSignIcon className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatCurrency(tenant.balance)}</p>
              <p className="text-sm text-slate-400">Balance Due</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatDate(tenant.leaseStart)}</p>
              <p className="text-sm text-slate-400">Lease Start</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">{formatDate(tenant.leaseEnd)}</p>
              <p className="text-sm text-slate-400">Lease End</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs tabs={tabs} defaultTab="overview">
        <TabPanel tabId="overview" activeTab="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Contact Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-dark flex items-center justify-center">
                    <MailIcon className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <p className="text-white">{tenant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-dark flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <p className="text-white">{tenant.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Lease Details</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Property</span>
                  <span className="text-white">{tenant.propertyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unit</span>
                  <span className="text-white">{tenant.unitNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lease Period</span>
                  <span className="text-white">
                    {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Rent</span>
                  <span className="text-white">{formatCurrency(tenant.rentAmount)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        <TabPanel tabId="payments" activeTab="overview">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Payment History</h3>
            </CardHeader>
            <CardContent className="p-0">
              <Table
                columns={paymentColumns}
                data={tenantPayments}
                keyExtractor={(payment) => payment.id}
                emptyMessage="No payment history"
              />
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel tabId="maintenance" activeTab="overview">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Maintenance Requests</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {tenantMaintenance.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No maintenance requests</p>
              ) : (
                tenantMaintenance.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 rounded-lg bg-surface-dark hover:bg-surface-hover transition-colors cursor-pointer"
                    onClick={() => navigate(`/maintenance/${request.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-white">{request.title}</p>
                        <p className="text-sm text-slate-400 mt-1">
                          {request.description.slice(0, 100)}...
                        </p>
                      </div>
                      <Badge
                        variant={
                          request.status === 'resolved'
                            ? 'success'
                            : request.status === 'in_progress'
                            ? 'info'
                            : 'warning'
                        }
                      >
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel tabId="documents" activeTab="overview">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Documents</h3>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-center py-8">No documents uploaded</p>
            </CardContent>
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  )
}