import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function AddTenantPage() {
  const navigate = useNavigate()
  
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyName: '',
    unitNumber: '',
    rentAmount: '',
    leaseStart: '',
    leaseEnd: '',
    paymentStatus: 'pending' // Default to pending
  })

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create new tenant object
    const newTenant = {
      id: Date.now().toString(), // Simple unique ID using timestamp
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      propertyName: formData.propertyName,
      unitNumber: formData.unitNumber,
      rentAmount: parseFloat(formData.rentAmount),
      leaseStart: formData.leaseStart,
      leaseEnd: formData.leaseEnd,
      paymentStatus: formData.paymentStatus, // Use selected status
      balance: 0 // Default balance
    }

    // Get existing tenants from localStorage
    const existingTenants = JSON.parse(localStorage.getItem('tenants') || '[]')
    
    // Add new tenant to the array
    const updatedTenants = [...existingTenants, newTenant]
    
    // Save back to localStorage
    localStorage.setItem('tenants', JSON.stringify(updatedTenants))

    // Navigate back to tenants page
    navigate('/tenants')
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/tenants')}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Tenant</h1>
          <p className="text-slate-400">Fill in the tenant information below</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-6">Tenant Information</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter tenant name"
                required
                className="w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="w-full"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number *
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0712345678"
                required
                className="w-full"
              />
            </div>

            {/* Property Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Property Name *
              </label>
              <Input
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Enter property name"
                required
                className="w-full"
              />
            </div>

            {/* Unit Number */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Unit Number *
              </label>
              <Input
                name="unitNumber"
                value={formData.unitNumber}
                onChange={handleChange}
                placeholder="Enter unit number"
                required
                className="w-full"
              />
            </div>

            {/* Monthly Rent */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Monthly Rent (KES) *
              </label>
              <Input
                name="rentAmount"
                type="number"
                value={formData.rentAmount}
                onChange={handleChange}
                placeholder="Enter rent amount"
                required
                className="w-full"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Payment Status *
              </label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            {/* Lease Start */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Lease Start Date *
              </label>
              <Input
                name="leaseStart"
                type="date"
                value={formData.leaseStart}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Lease End */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Lease End Date *
              </label>
              <Input
                name="leaseEnd"
                type="date"
                value={formData.leaseEnd}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit">
              Add Tenant
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/tenants')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}