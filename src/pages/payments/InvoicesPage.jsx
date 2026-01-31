import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon, SearchIcon, FileTextIcon, XIcon, EditIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import { EmptyState } from '../../components/ui/EmptyState'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { formatDate } from '../../utils/formatters'
// Import invoice functions from mockData
import { 
  getAllInvoices,
  addInvoice, 
  updateInvoice 
} from '../../utils/mockData'

// Function to format amounts in Kenyan Shillings
const formatKES = (amount) => {
  return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function InvoicesPage() {
  const navigate = useNavigate()
  
  // Get invoices from mockData and track them in state
  // Using state with a counter to force re-renders when data changes
  const [, setRefreshCounter] = useState(0)
  const invoices = getAllInvoices() // Get current invoices from mockData
  
  // State to control whether the create/edit form is visible
  const [showForm, setShowForm] = useState(false)
  
  // State to track which invoice is being edited (null means creating new)
  const [editingInvoice, setEditingInvoice] = useState(null)
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('')
  
  // State for status filter
  const [statusFilter, setStatusFilter] = useState('')

  // Function to refresh the component when data changes
  const forceRefresh = () => {
    setRefreshCounter(prev => prev + 1)
  }

  // Function to open the create form
  const handleCreateClick = () => {
    setEditingInvoice(null) // Clear any editing invoice
    setShowForm(true) // Show the form
  }

  // Function to open the edit form with existing invoice data
  const handleEditClick = (invoice) => {
    setEditingInvoice(invoice) // Set the invoice to edit
    setShowForm(true) // Show the form
  }

  // Function to handle creating a new invoice
  const handleCreateInvoice = (invoiceData) => {
    addInvoice(invoiceData) // Add to mockData
    forceRefresh() // Refresh the component to show new invoice
    setShowForm(false) // Close the form
  }

  // Function to handle updating an existing invoice
  const handleUpdateInvoice = (invoiceData) => {
    updateInvoice(editingInvoice.id, invoiceData) // Update in mockData
    forceRefresh() // Refresh the component to show changes
    setShowForm(false) // Close the form
    setEditingInvoice(null) // Clear editing state
  }

  // Function to close the form
  const handleCloseForm = () => {
    setShowForm(false)
    setEditingInvoice(null)
  }

  // Filter invoices based on search and status
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = !statusFilter || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <Header onCreateClick={handleCreateClick} />
      
      {/* Show the form when creating or editing */}
      {showForm && (
        <InvoiceForm 
          onClose={handleCloseForm}
          onCreate={handleCreateInvoice}
          onUpdate={handleUpdateInvoice}
          editingInvoice={editingInvoice}
        />
      )}
      
      <Filters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <InvoiceList 
        invoices={filteredInvoices} 
        onEditClick={handleEditClick}
        onRowClick={(invoice) => navigate(`/payments/${invoice.id}`)}
      />
    </div>
  )
}

// Header component with Create Invoice button
function Header({ onCreateClick }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Invoices</h1>
        <p className="text-slate-400">Manage and track invoices</p>
      </div>
      <Button leftIcon={<PlusIcon className="w-4 h-4" />} onClick={onCreateClick}>
        Create Invoice
      </Button>
    </div>
  )
}

// Form to create or edit an invoice
function InvoiceForm({ onClose, onCreate, onUpdate, editingInvoice }) {
  // Initialize form with existing data if editing, otherwise empty
  const [formData, setFormData] = useState({
    tenantName: editingInvoice?.tenantName || '',
    propertyName: editingInvoice?.propertyName || '',
    unitNumber: editingInvoice?.unitNumber || '',
    rentAmount: editingInvoice?.items?.[0]?.amount || '',
    serviceFee: editingInvoice?.items?.[1]?.amount || '',
    dueDate: editingInvoice?.dueDate || '',
    method: editingInvoice?.method || 'bank transfer',
  })

  // Handle input changes - updates the form data
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page reload
    
    // Calculate total amount (rent + service fee)
    const rentAmount = parseFloat(formData.rentAmount) || 0
    const serviceFee = parseFloat(formData.serviceFee) || 0
    const totalAmount = rentAmount + serviceFee

    // Create invoice data object
    const invoiceData = {
      tenantName: formData.tenantName,
      propertyName: formData.propertyName,
      unitNumber: formData.unitNumber,
      amount: totalAmount,
      dueDate: formData.dueDate,
      method: formData.method,
      items: [
        { description: 'Monthly Rent', amount: rentAmount },
        { description: 'Service Fee', amount: serviceFee },
      ]
    }

    // Call either create or update function
    if (editingInvoice) {
      onUpdate(invoiceData) // Update existing invoice
    } else {
      onCreate(invoiceData) // Create new invoice
    }
  }

  // Check if form is valid (all required fields filled)
  const isFormValid = 
    formData.tenantName &&
    formData.propertyName &&
    formData.unitNumber &&
    formData.rentAmount &&
    formData.dueDate

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
          {/* Close button */}
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        {/* Show invoice number when editing */}
        {editingInvoice && (
          <p className="text-slate-400 text-sm">Invoice #{editingInvoice.id}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tenant Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tenant Name *
              </label>
              <Input
                placeholder="Enter tenant name"
                value={formData.tenantName}
                onChange={(e) => handleChange('tenantName', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Property Name *
              </label>
              <Input
                placeholder="Enter property name"
                value={formData.propertyName}
                onChange={(e) => handleChange('propertyName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Unit Number *
              </label>
              <Input
                placeholder="e.g., 12A"
                value={formData.unitNumber}
                onChange={(e) => handleChange('unitNumber', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Due Date *
              </label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="border-t border-slate-700 pt-4 mt-4">
            <h3 className="text-lg font-semibold text-white mb-4">Payment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rent Amount (KES) *
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.rentAmount}
                  onChange={(e) => handleChange('rentAmount', e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Service Fee (KES)
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={formData.serviceFee}
                  onChange={(e) => handleChange('serviceFee', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Payment Method
              </label>
              <Select
                options={[
                  { value: 'bank transfer', label: 'Bank Transfer' },
                  { value: 'M-Pesa', label: 'M-Pesa' },
                  { value: 'cash', label: 'Cash' },
                  { value: 'cheque', label: 'Cheque' },
                ]}
                value={formData.method}
                onChange={(e) => handleChange('method', e.target.value)}
              />
            </div>

            {/* Total Amount Display */}
            {(formData.rentAmount || formData.serviceFee) && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-white">
                    {formatKES(
                      (parseFloat(formData.rentAmount) || 0) + 
                      (parseFloat(formData.serviceFee) || 0)
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!isFormValid}
            >
              {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Filter section with search and status filter
function Filters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search invoices..."
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
  )
}

// Badge component to show invoice status
function StatusBadge({ status }) {
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

// List of all invoices in a table format
function InvoiceList({ invoices, onEditClick, onRowClick }) {
  // Show empty state if no invoices
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={<FileTextIcon className="w-8 h-8 text-primary-400" />}
        title="No invoices found"
        description="Try adjusting your search or create a new invoice."
      />
    )
  }

  // Define table columns
  const columns = [
    {
      key: 'id',
      header: 'Invoice ID',
      render: (invoice) => (
        <span className="font-mono text-primary-400">#{invoice.id}</span>
      ),
    },
    {
      key: 'tenant',
      header: 'Tenant',
      render: (invoice) => (
        <div>
          <p className="font-medium text-white">{invoice.tenantName}</p>
          <p className="text-sm text-slate-400">
            {invoice.propertyName} • Unit {invoice.unitNumber}
          </p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (invoice) => (
        <span className="font-semibold text-white">
          {formatKES(invoice.amount)}
        </span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (invoice) => formatDate(invoice.dueDate),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (invoice) => formatDate(invoice.createdAt),
    },
    {
      key: 'status',
      header: 'Status',
      render: (invoice) => <StatusBadge status={invoice.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (invoice) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation() // Prevent row click when clicking edit
            onEditClick(invoice)
          }}
        >
          <EditIcon className="w-4 h-4" />
        </Button>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      data={invoices}
      keyExtractor={(invoice) => invoice.id}
      onRowClick={onRowClick}
      emptyMessage="No invoices found"
    />
  )
}