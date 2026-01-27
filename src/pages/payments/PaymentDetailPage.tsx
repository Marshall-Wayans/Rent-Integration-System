import React from 'react'
import {
  ArrowLeftIcon,
  DownloadIcon,
  PrinterIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { formatCurrency, formatDate, formatDateTime } from '../../utils/formatters'

/* ---------------------------------- */
/* Page Component (ADDED) */
/* ---------------------------------- */

export function PaymentDetailPage() {
  // temporary mock data (until API / route params)
  const payment = {
    status: 'pending',
    amount: 1800,
    dueDate: '2024-02-01',
    paidDate: null,
    tenantName: 'John Doe',
    propertyName: 'Sunset Apartments',
    unitNumber: '12A',
    method: 'bank transfer',
  }

  const invoice = {
    id: 'INV-1001',
    amount: 1800,
    createdAt: '2024-01-01T10:30:00Z',
    items: [
      { description: 'January Rent', amount: 1700 },
      { description: 'Service Fee', amount: 100 },
    ],
  }

  return (
    <div className="space-y-6">
      <Header invoiceId={invoice.id} />
      <StatusCard
        status={payment.status}
        amount={payment.amount}
        dueDate={payment.dueDate}
        paidDate={payment.paidDate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentInfo payment={payment} />
        <InvoiceDetails invoice={invoice} />
      </div>
      <PaymentTimeline payment={payment} invoice={invoice} />
      <Actions status={payment.status} />
    </div>
  )
}

/* ---------------------------------- */
/* Existing Components (UNCHANGED) */
/* ---------------------------------- */

function Header({ invoiceId }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Details</h1>
          <p className="text-slate-400">Invoice #{invoiceId}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" leftIcon={<PrinterIcon className="w-4 h-4" />}>
          Print
        </Button>
        <Button variant="outline" leftIcon={<DownloadIcon className="w-4 h-4" />}>
          Download
        </Button>
      </div>
    </div>
  )
}

function StatusIcon({ status }) {
  switch (status) {
    case 'paid':
      return <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
    case 'pending':
      return <ClockIcon className="w-6 h-6 text-amber-400" />
    case 'overdue':
      return <AlertCircleIcon className="w-6 h-6 text-red-400" />
    default:
      return null
  }
}

function StatusBadge({ status }) {
  switch (status) {
    case 'paid':
      return <Badge variant="success" size="md">Paid</Badge>
    case 'pending':
      return <Badge variant="warning" size="md">Pending</Badge>
    case 'overdue':
      return <Badge variant="error" size="md">Overdue</Badge>
    default:
      return null
  }
}

function StatusCard({ status, amount, dueDate, paidDate }) {
  return (
    <Card variant="gradient-indigo" className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <StatusIcon status={status} />
          <div>
            <p className="text-3xl font-bold text-white">
              {formatCurrency(amount)}
            </p>
            <p className="text-white/70">
              {status === 'paid'
                ? `Paid on ${formatDate(paidDate)}`
                : `Due ${formatDate(dueDate)}`}
            </p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
    </Card>
  )
}

function PaymentInfo({ payment }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Payment Information</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-400">Tenant</span>
          <span className="text-white">{payment.tenantName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Property</span>
          <span className="text-white">{payment.propertyName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Unit</span>
          <span className="text-white">{payment.unitNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Due Date</span>
          <span className="text-white">{formatDate(payment.dueDate)}</span>
        </div>
        {payment.paidDate && (
          <div className="flex justify-between">
            <span className="text-slate-400">Paid Date</span>
            <span className="text-white">{formatDate(payment.paidDate)}</span>
          </div>
        )}
        {payment.method && (
          <div className="flex justify-between">
            <span className="text-slate-400">Payment Method</span>
            <span className="text-white capitalize">{payment.method}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function InvoiceDetails({ invoice }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Invoice Details</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoice.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b border-slate-700/50 last:border-0"
            >
              <span className="text-slate-300">{item.description}</span>
              <span className="text-white font-medium">
                {formatCurrency(item.amount)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t border-slate-700">
            <span className="text-white font-semibold">Total</span>
            <span className="text-white font-bold text-lg">
              {formatCurrency(invoice.amount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PaymentTimeline({ payment, invoice }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Payment Timeline</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary-400" />
            </div>
            <div>
              <p className="text-white font-medium">Invoice Created</p>
              <p className="text-sm text-slate-400">
                {formatDateTime(invoice.createdAt)}
              </p>
            </div>
          </div>
          {payment.status === 'paid' && (
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-medium">Payment Received</p>
                <p className="text-sm text-slate-400">
                  {formatDateTime(payment.paidDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Actions({ status }) {
  if (status === 'paid') return null
  return (
    <div className="flex justify-end">
      <Button size="lg">Mark as Paid</Button>
    </div>
  )
}

export {
  Header,
  StatusCard,
  PaymentInfo,
  InvoiceDetails,
  PaymentTimeline,
  Actions,
  StatusBadge,
  StatusIcon,
}
