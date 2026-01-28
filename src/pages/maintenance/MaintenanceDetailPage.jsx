import React, { useState } from 'react'
import { ArrowLeftIcon, UserIcon, CalendarIcon, MapPinIcon, SendIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Avatar } from '../../components/ui/Avatar'
import { maintenanceRequests } from '../../utils/mockData'
import { formatDateTime, formatRelativeTime } from '../../utils/formatters'


const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
]


function Header({ request, status, onBack }) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent': return <Badge variant="error" size="md">Urgent</Badge>
      case 'high': return <Badge variant="warning" size="md">High</Badge>
      case 'medium': return <Badge variant="info" size="md">Medium</Badge>
      case 'low': return <Badge variant="default" size="md">Low</Badge>
      default: return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open': return <Badge variant="warning" size="md" dot>Open</Badge>
      case 'in_progress': return <Badge variant="info" size="md" dot>In Progress</Badge>
      case 'resolved': return <Badge variant="success" size="md" dot>Resolved</Badge>
      case 'closed': return <Badge variant="default" size="md" dot>Closed</Badge>
      default: return null
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeftIcon className="w-4 h-4" />
      </Button>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-white">{request.title}</h1>
          {getPriorityBadge(request.priority)}
        </div>
        <p className="text-slate-400">Request #{request.id}</p>
      </div>
      {getStatusBadge(status)}
    </div>
  )
}


function DescriptionCard({ description }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Description</h3>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}


function Timeline({ comments, newComment, setNewComment, handleAddComment, createdAt }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Activity Timeline</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-primary-400" />
            </div>
            <div>
              <p className="text-white font-medium">Request Created</p>
              <p className="text-sm text-slate-400">{formatDateTime(createdAt)}</p>
            </div>
          </div>

          {comments.map((comment, idx) => (
            <div key={idx} className="flex gap-4">
              <Avatar name={comment.author} size="sm" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium">{comment.author}</p>
                  <span className="text-xs text-slate-500">{formatRelativeTime(comment.createdAt)}</span>
                </div>
                <p className="text-slate-300">{comment.text}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-4 pt-4 border-t border-slate-700/50">
            <Avatar name="You" size="sm" />
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" leftIcon={<SendIcon className="w-4 h-4" />} onClick={handleAddComment}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


function Sidebar({ request, status, setStatus, assignedTo, setAssignedTo, handleUpdateRequest }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Details</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-dark flex items-center justify-center">
              <MapPinIcon className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Location</p>
              <p className="text-white">{request.propertyName} • Unit {request.unitNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-dark flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Reported by</p>
              <p className="text-white">{request.tenantName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-dark flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Created</p>
              <p className="text-white">{formatDateTime(request.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Actions</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select label="Status" options={statusOptions} value={status} onChange={setStatus} />
          <Input label="Assign To" placeholder="Enter technician name" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
          <Button className="w-full" onClick={handleUpdateRequest}>Update Request</Button>
        </CardContent>
      </Card>
    </div>
  )
}


function MaintenanceDetailPageWrapper() {
  const { id } = useParams()
  const navigate = useNavigate()
  const request = maintenanceRequests.find(r => r.id === id)
  const [status, setStatus] = useState(request?.status || '')
  const [assignedTo, setAssignedTo] = useState(request?.assignedTo || '')
  const [comments, setComments] = useState(request?.comments || [])
  const [newComment, setNewComment] = useState('')

  if (!request) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Request not found</p>
        <Button variant="ghost" onClick={() => navigate('/maintenance')} className="mt-4">Back to Maintenance</Button>
      </div>
    )
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setComments([...comments, { author: 'You', text: newComment, createdAt: new Date() }])
    setNewComment('')
  }

  const handleUpdateRequest = () => {
    console.log('Updated Request:', { status, assignedTo })
  }

  return (
    <div className="space-y-6">
      <Header request={request} status={status} onBack={() => navigate('/maintenance')} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DescriptionCard description={request.description} />
          <Timeline comments={comments} newComment={newComment} setNewComment={setNewComment} handleAddComment={handleAddComment} createdAt={request.createdAt} />
        </div>
        <Sidebar request={request} status={status} setStatus={setStatus} assignedTo={assignedTo} setAssignedTo={setAssignedTo} handleUpdateRequest={handleUpdateRequest} />
      </div>
    </div>
  )
}

export { MaintenanceDetailPageWrapper as MaintenanceDetailPage, Header, DescriptionCard, Timeline, Sidebar }