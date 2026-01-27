import React from 'react'
import { PlusIcon, SearchIcon, FileTextIcon } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Table } from '../../components/ui/Table'
import { EmptyState } from '../../components/ui/EmptyState'
import { invoices } from '../../utils/mockData'
import { formatCurrency, formatDate } from '../../utils/formatters'

/* ---------------------------------- */
/* Page Component (THIS WAS MISSING) */
/* ---------------------------------- */

export function InvoicesPage() {
  return (
    <div className="space-y-6">
      <Header />
      <Filters />
      <InvoiceList />
    </div>
  )
}

/* ---------------------------------- */
/* Sub Components */
/* ---------------------------------- */

function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Invoices</h1>
        <p className="text-slate-400">Manage and track invoices</p>
      </div>
      <Button leftIcon={<PlusIcon className="w-4 h-4" />}>
        Create Invoice
      </Button>
    </div>
  )
}

function Filters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search invoices..."
          value=""
          onChange={() => {}}
          leftIcon={<SearchIcon className="w-5 h-5" />}
        />
      </div>
      <Select options={[]} value="" onChange={() => {}} className="w-40" />
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
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

function InvoiceRow({ invoice }: { invoice: any }) {
  const columns = [
    {
      key: 'id',
      header: 'Invoice ID',
      render: () => (
        <span className="font-mono text-primary-400">
          #{invoice.id}
        </span>
      ),
    },
    {
      key: 'tenant',
      header: 'Tenant',
      render: () => (
        <div>
          <p className="font-medium text-white">
            {invoice.tenantName}
          </p>
          <p className="text-sm text-slate-400">
            {invoice.propertyName} • Unit {invoice.unitNumber}
          </p>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: () => (
        <span className="font-semibold text-white">
          {formatCurrency(invoice.amount)}
        </span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: () => formatDate(invoice.dueDate),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: () => formatDate(invoice.createdAt),
    },
    {
      key: 'status',
      header: 'Status',
      render: () => <StatusBadge status={invoice.status} />,
    },
  ]

  return (
    <Table
      columns={columns}
      data={[invoice]}
      keyExtractor={() => invoice.id}
      onRowClick={() => {}}
    />
  )
}

function InvoiceList() {
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={<FileTextIcon className="w-8 h-8 text-primary-400" />}
        title="No invoices found"
        description="Try adjusting your search or create a new invoice."
        actionLabel="Create Invoice"
        onAction={() => {}}
      />
    )
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <InvoiceRow key={invoice.id} invoice={invoice} />
      ))}
    </div>
  )
}
