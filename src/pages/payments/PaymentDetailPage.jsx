import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  DownloadIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { formatDate, formatDateTime } from '../../utils/formatters'
// Import functions from mockData
import { getInvoiceById, markInvoiceAsPaid } from '../../utils/mockData'

// Function to format amounts in Kenyan Shillings
const formatKES = (amount) => {
  return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function PaymentDetailPage() {
  const navigate = useNavigate()
  
  // Get the invoice/payment ID from the URL
  const { id } = useParams()
  
  // Force component to re-render when payment status changes
  const [, setRefreshCounter] = useState(0)
  const forceRefresh = () => setRefreshCounter(prev => prev + 1)
  
  // Get the specific invoice/payment by ID from mockData
  const payment = getInvoiceById(id)

  // If payment not found, show error message
  if (!payment) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-2">Payment Not Found</h1>
        <p className="text-slate-400 mb-4">The payment you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/payments')}>Back to Payments</Button>
      </div>
    )
  }

  // Function to handle marking payment as paid
  const handleMarkAsPaid = () => {
    markInvoiceAsPaid(payment.id) // Update in mockData
    forceRefresh() // Force component to re-render
  }

  // Function to download invoice as PDF
  const handleDownload = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank')
    
    // Generate HTML content with all invoice details
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${payment.id}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .section {
              margin: 20px 0;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
              color: #000;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .label {
              color: #666;
            }
            .value {
              font-weight: 500;
            }
            .items-table {
              width: 100%;
              margin: 20px 0;
              border-collapse: collapse;
            }
            .items-table th,
            .items-table td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .items-table th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .total-row {
              font-weight: bold;
              font-size: 18px;
              background-color: #f9f9f9;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 4px;
              font-size: 14px;
              font-weight: 500;
            }
            .status-paid {
              background-color: #d4edda;
              color: #155724;
            }
            .status-pending {
              background-color: #fff3cd;
              color: #856404;
            }
            .status-overdue {
              background-color: #f8d7da;
              color: #721c24;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>PAYMENT INVOICE</h1>
            <p>Invoice #${payment.id}</p>
          </div>

          <div class="section">
            <div class="section-title">Payment Status</div>
            <div class="info-row">
              <span class="label">Status:</span>
              <span class="status-badge status-${payment.status}">${payment.status.toUpperCase()}</span>
            </div>
            <div class="info-row">
              <span class="label">Amount:</span>
              <span class="value">${formatKES(payment.amount)}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Payment Information</div>
            <div class="info-row">
              <span class="label">Tenant:</span>
              <span class="value">${payment.tenantName}</span>
            </div>
            <div class="info-row">
              <span class="label">Property:</span>
              <span class="value">${payment.propertyName}</span>
            </div>
            <div class="info-row">
              <span class="label">Unit:</span>
              <span class="value">${payment.unitNumber}</span>
            </div>
            <div class="info-row">
              <span class="label">Due Date:</span>
              <span class="value">${formatDate(payment.dueDate)}</span>
            </div>
            ${payment.paidDate ? `
            <div class="info-row">
              <span class="label">Paid Date:</span>
              <span class="value">${formatDate(payment.paidDate)}</span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Payment Method:</span>
              <span class="value">${payment.method}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Invoice Details</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${payment.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td style="text-align: right;">${formatKES(item.amount)}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td>TOTAL</td>
                  <td style="text-align: right;">${formatKES(payment.amount)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Timeline</div>
            <div class="info-row">
              <span class="label">Invoice Created:</span>
              <span class="value">${formatDateTime(payment.createdAt)}</span>
            </div>
            ${payment.status === 'paid' && payment.paidDate ? `
            <div class="info-row">
              <span class="label">Payment Received:</span>
              <span class="value">${formatDateTime(payment.paidDate)}</span>
            </div>
            ` : ''}
          </div>
        </body>
      </html>
    `
    
    // Write content to new window and trigger print dialog
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  return (
    <div className="space-y-6">
      <Header 
        invoiceId={payment.id} 
        onDownload={handleDownload}
        onBack={() => navigate('/payments')}
      />
      <StatusCard
        status={payment.status}
        amount={payment.amount}
        dueDate={payment.dueDate}
        paidDate={payment.paidDate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentInfo payment={payment} />
        <InvoiceDetails payment={payment} />
      </div>
      <PaymentTimeline payment={payment} />
      <Actions status={payment.status} onMarkAsPaid={handleMarkAsPaid} />
    </div>
  )
}

// Header with back button and download button
function Header({ invoiceId, onDownload, onBack }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">Payment Details</h1>
          <p className="text-slate-400">Invoice #{invoiceId}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" leftIcon={<DownloadIcon className="w-4 h-4" />} onClick={onDownload}>
          Download
        </Button>
      </div>
    </div>
  )
}

// Icon based on payment status
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

// Badge based on payment status
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

// Large status card showing amount and status
function StatusCard({ status, amount, dueDate, paidDate }) {
  return (
    <Card variant="gradient-indigo" className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <StatusIcon status={status} />
          <div>
            <p className="text-3xl font-bold text-white">
              {formatKES(amount)}
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

// Card showing payment information
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

// Card showing invoice line items
function InvoiceDetails({ payment }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Invoice Details</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {payment.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b border-slate-700/50 last:border-0"
            >
              <span className="text-slate-300">{item.description}</span>
              <span className="text-white font-medium">
                {formatKES(item.amount)}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-3 border-t border-slate-700">
            <span className="text-white font-semibold">Total</span>
            <span className="text-white font-bold text-lg">
              {formatKES(payment.amount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Timeline showing invoice creation and payment
function PaymentTimeline({ payment }) {
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
                {formatDateTime(payment.createdAt)}
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

// Action buttons (Mark as Paid)
function Actions({ status, onMarkAsPaid }) {
  // Only show the button if payment is not paid
  if (status === 'paid') return null
  
  return (
    <div className="flex justify-end">
      <Button size="lg" onClick={onMarkAsPaid}>
        Mark as Paid
      </Button>
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