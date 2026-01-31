import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PlusIcon,
  SearchIcon,
  MapPinIcon,
  HomeIcon, 
  UsersIcon,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { properties as mockProperties } from '../../utils/mockData'
import { formatCurrency } from '../../utils/formatters'

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'maintenance', label: 'Maintenance' },
]

const typeOptions = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'commercial', label: 'Commercial' },
]

export function PropertiesPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [allProperties, setAllProperties] = useState(mockProperties)

  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]')
    setAllProperties([...mockProperties, ...savedProperties])
  }, [])

  const filteredProperties = allProperties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || property.status === statusFilter
    const matchesType = !typeFilter || property.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" dot>Active</Badge>
      case 'inactive':
        return <Badge variant="default" dot>Inactive</Badge>
      case 'maintenance':
        return <Badge variant="warning" dot>Maintenance</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Properties</h1>
          <p className="text-slate-400">Manage your rental properties</p>
        </div>
        <Button
          onClick={() => navigate('/properties/add')}
          leftIcon={<PlusIcon className="w-4 h-4" />}
        >
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<SearchIcon className="w-5 h-5" />}
          />
        </div>
        <div className="flex gap-3">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40"
          />
          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <EmptyState
          icon={<HomeIcon className="w-8 h-8 text-primary-400" />}
          title="No properties found"
          description="Try adjusting your search or filters, or add your first property."
          actionLabel="Add Property"
          onAction={() => navigate('/properties/add')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hover
                onClick={() => navigate(`/properties/${property.id}`)}
                className="overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(property.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{property.city}, {property.state}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <HomeIcon className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{property.units}</p>
                        <p className="text-xs text-slate-400">Units</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                        <UsersIcon className="w-4 h-4 text-secondary-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{property.occupiedUnits}</p>
                        <p className="text-xs text-slate-400">Occupied</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Monthly Revenue</p>
                      <p className="text-lg font-semibold text-white">
                        {formatCurrency(property.monthlyRevenue)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Occupancy</p>
                      <p className="text-lg font-semibold text-emerald-400">
                        {Math.round((property.occupiedUnits / property.units) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
