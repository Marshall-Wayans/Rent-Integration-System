import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeftIcon,
  EditIcon,
  MapPinIcon,
  HomeIcon,
  UsersIcon, 
  DollarSignIcon,
  CalendarIcon,
  PlusIcon,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Table } from '../../components/ui/Table'
import { Avatar } from '../../components/ui/Avatar'
import { Tabs, TabPanel } from '../../components/ui/Tabs'
import { properties as mockProperties, units, tenants } from '../../utils/mockData'
import { formatCurrency, formatDate } from '../../utils/formatters'

export function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    let foundProperty = mockProperties.find((p) => p.id === id)
    if (!foundProperty) {
      const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]')
      foundProperty = savedProperties.find((p) => p.id === id)
    }
    setProperty(foundProperty)
  }, [id])

  const propertyUnits = units.filter((u) => u.propertyId === id)
  const propertyTenants = tenants.filter((t) => t.propertyId === id)

  if (!property) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Property not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate('/properties')}
          className="mt-4"
        >
          Back to Properties
        </Button>
      </div>
    )
  }

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

  const getUnitStatusBadge = (status) => {
    switch (status) {
      case 'occupied':
        return <Badge variant="success">Occupied</Badge>
      case 'vacant':
        return <Badge variant="info">Vacant</Badge>
      case 'maintenance':
        return <Badge variant="warning">Maintenance</Badge>
      default:
        return null
    }
  }

  const unitColumns = [
    { key: 'unitNumber', header: 'Unit' },
    { key: 'floor', header: 'Floor' },
    { key: 'bedrooms', header: 'Bed/Bath', render: (unit) => `${unit.bedrooms}/${unit.bathrooms}` },
    { key: 'sqft', header: 'Sq Ft' },
    { key: 'rentAmount', header: 'Rent', render: (unit) => formatCurrency(unit.rentAmount) },
    { key: 'status', header: 'Status', render: (unit) => getUnitStatusBadge(unit.status) },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'units', label: 'Units' },
    { id: 'tenants', label: 'Tenants' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/properties')}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{property.name}</h1>
            {getStatusBadge(property.status)}
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
            <MapPinIcon className="w-4 h-4" />
            <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
          </div>
        </div>
        <Button variant="outline" leftIcon={<EditIcon className="w-4 h-4" />}>
          Edit Property
        </Button>
      </div>

      {/* Property Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 md:h-80 rounded-xl overflow-hidden"
      >
        <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="flex gap-4">
            {property.amenities.slice(0, 4).map((amenity) => (
              <Badge key={amenity} variant="default" className="bg-white/20 backdrop-blur-sm">{amenity}</Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{property.units}</p>
              <p className="text-sm text-slate-400">Total Units</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary-500/20 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-secondary-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{property.occupiedUnits}</p>
              <p className="text-sm text-slate-400">Occupied</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <DollarSignIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatCurrency(property.monthlyRevenue)}</p>
              <p className="text-sm text-slate-400">Monthly Revenue</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{Math.round((property.occupiedUnits / property.units) * 100)}%</p>
              <p className="text-sm text-slate-400">Occupancy Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="overview">
        <TabPanel tabId="overview" activeTab="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Property Details</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Type</span>
                  <span className="text-white capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Address</span>
                  <span className="text-white">{property.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">City</span>
                  <span className="text-white">{property.city}, {property.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ZIP Code</span>
                  <span className="text-white">{property.zipCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Created</span>
                  <span className="text-white">{formatDate(property.createdAt)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-white">Amenities</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <Badge key={amenity} variant="primary">{amenity}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        <TabPanel tabId="units" activeTab="overview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Units</h3>
                <p className="text-sm text-slate-400">{propertyUnits.length} total units</p>
              </div>
              <Button size="sm" leftIcon={<PlusIcon className="w-4 h-4" />}>Add Unit</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table columns={unitColumns} data={propertyUnits} keyExtractor={(unit) => unit.id} />
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel tabId="tenants" activeTab="overview">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Tenants</h3>
              <p className="text-sm text-slate-400">{propertyTenants.length} tenants</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {propertyTenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-surface-dark hover:bg-surface-hover transition-colors cursor-pointer"
                  onClick={() => navigate(`/tenants/${tenant.id}`)}
                >
                  <Avatar src={tenant.avatar} name={tenant.name} />
                  <div className="flex-1">
                    <p className="font-medium text-white">{tenant.name}</p>
                    <p className="text-sm text-slate-400">Unit {tenant.unitNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(tenant.rentAmount)}/mo</p>
                    <Badge variant={tenant.paymentStatus === 'paid' ? 'success' : tenant.paymentStatus === 'pending' ? 'warning' : 'error'}>
                      {tenant.paymentStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  )
}