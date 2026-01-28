import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlusIcon, SearchIcon, WrenchIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { EmptyState } from '../../components/ui/EmptyState'
import { maintenanceRequests } from '../../utils/mockData'
import { formatRelativeTime } from '../../utils/formatters'


const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
]

const priorityOptions = [
  { value: '', label: 'All Priority' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]


function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Maintenance</h1>
        <p className="text-slate-400">Track and manage maintenance requests</p>
      </div>
      <Button leftIcon={<PlusIcon className="w-4 h-4" />}>New Request</Button>
    </div>
  )
}


function Filters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<SearchIcon className="w-5 h-5" />}
        />
      </div>
      <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40" />
      <Select options={priorityOptions} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="w-40" />
    </div>
  )
}


function RequestCard({ request, index, onClick }) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent': return <Badge variant="error">Urgent</Badge>
      case 'high': return <Badge variant="warning">High</Badge>
      case 'medium': return <Badge variant="info">Medium</Badge>
      case 'low': return <Badge variant="default">Low</Badge>
      default: return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open': return <Badge variant="warning" dot>Open</Badge>
      case 'in_progress': return <Badge variant="info" dot>In Progress</Badge>
      case 'resolved': return <Badge variant="success" dot>Resolved</Badge>
      case 'closed': return <Badge variant="default" dot>Closed</Badge>
      default: return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card hover className="p-5 cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white truncate">{request.title}</h3>
              {getPriorityBadge(request.priority)}
            </div>
            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{request.description}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{request.propertyName} • Unit {request.unitNumber}</span>
              <span>•</span>
              <span>{request.tenantName}</span>
              <span>•</span>
              <span>{formatRelativeTime(request.createdAt)}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            {getStatusBadge(request.status)}
            {request.assignedTo && <span className="text-xs text-slate-500">Assigned: {request.assignedTo}</span>}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}


function RequestList({ filteredRequests, navigate }) {
  if (filteredRequests.length === 0) {
    return (
      <EmptyState
        icon={<WrenchIcon className="w-8 h-8 text-primary-400" />}
        title="No maintenance requests"
        description="All caught up! No maintenance requests match your filters."
      />
    )
  }

  return (
    <div className="space-y-4">
      {filteredRequests.map((request, index) => (
        <RequestCard key={request.id} request={request} index={index} onClick={() => navigate(`/maintenance/${request.id}`)} />
      ))}
    </div>
  )
}


function MaintenancePageWrapper() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const filteredRequests = maintenanceRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || request.status === statusFilter
    const matchesPriority = !priorityFilter || request.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      <Header />
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <RequestList filteredRequests={filteredRequests} navigate={navigate} />
    </div>
  )
}

export { MaintenancePageWrapper as MaintenancePage, Header, Filters, RequestCard, RequestList }