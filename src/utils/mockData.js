// Current user
export const currentUser = {
  id: 'u1',
  name: 'Alex Morgan',
  email: 'alex@rentflow.com',
  phone: '0701234567',
  role: 'owner',
  createdAt: '2023-01-15',
}

// Properties
export const properties = [
  {
    id: 'p1',
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90028',
    type: 'apartment',
    units: 24,
    occupiedUnits: 21,
    status: 'active',
    monthlyRevenue: 52500,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    amenities: ['Pool', 'Gym', 'Parking', 'Laundry'],
    createdAt: '2022-06-01',
  },
  {
    id: 'p2',
    name: 'Harbor View Condos',
    address: '456 Marina Way',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92101',
    type: 'condo',
    units: 12,
    occupiedUnits: 12,
    status: 'active',
    monthlyRevenue: 36000,
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    amenities: ['Ocean View', 'Concierge', 'Parking', 'Rooftop'],
    createdAt: '2022-08-15',
  },
  {
    id: 'p3',
    name: 'Downtown Lofts',
    address: '789 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    type: 'apartment',
    units: 18,
    occupiedUnits: 15,
    status: 'active',
    monthlyRevenue: 67500,
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=300&fit=crop',
    amenities: ['Gym', 'Rooftop', 'Bike Storage', 'Pet Friendly'],
    createdAt: '2023-01-10',
  },
  {
    id: 'p4',
    name: 'Oak Street Houses',
    address: '321 Oak Street',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    type: 'house',
    units: 6,
    occupiedUnits: 5,
    status: 'active',
    monthlyRevenue: 15000,
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    amenities: ['Yard', 'Garage', 'Pet Friendly'],
    createdAt: '2023-03-20',
  },
]

// Units
export const units = [
  {
    id: 'u1',
    propertyId: 'p1',
    unitNumber: '101',
    floor: 1,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    rentAmount: 1800,
    status: 'occupied',
    tenantId: 't1',
    leaseStart: '2023-06-01',
    leaseEnd: '2024-05-31',
  },
  {
    id: 'u2',
    propertyId: 'p1',
    unitNumber: '102',
    floor: 1,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 850,
    rentAmount: 2200,
    status: 'occupied',
    tenantId: 't2',
    leaseStart: '2023-08-01',
    leaseEnd: '2024-07-31',
  },
  {
    id: 'u3',
    propertyId: 'p1',
    unitNumber: '201',
    floor: 2,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 950,
    rentAmount: 2500,
    status: 'vacant',
  },
  {
    id: 'u4',
    propertyId: 'p1',
    unitNumber: '202',
    floor: 2,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    rentAmount: 3000,
    status: 'occupied',
    tenantId: 't3',
    leaseStart: '2023-04-01',
    leaseEnd: '2024-03-31',
  },
  {
    id: 'u5',
    propertyId: 'p2',
    unitNumber: 'A1',
    floor: 1,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    rentAmount: 3000,
    status: 'occupied',
    tenantId: 't4',
    leaseStart: '2023-09-01',
    leaseEnd: '2024-08-31',
  },
  {
    id: 'u6',
    propertyId: 'p2',
    unitNumber: 'A2',
    floor: 1,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    rentAmount: 3500,
    status: 'occupied',
    tenantId: 't5',
    leaseStart: '2023-07-01',
    leaseEnd: '2024-06-30',
  },
  {
    id: 'u7',
    propertyId: 'p3',
    unitNumber: '1A',
    floor: 1,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    rentAmount: 3500,
    status: 'occupied',
    tenantId: 't6',
    leaseStart: '2023-10-01',
    leaseEnd: '2024-09-30',
  },
  {
    id: 'u8',
    propertyId: 'p3',
    unitNumber: '2B',
    floor: 2,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    rentAmount: 4500,
    status: 'maintenance',
  },
]

// Tenants - NO AVATARS, KENYAN PHONE NUMBERS
export const tenants = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '0712345678',
    unitId: 'u1',
    propertyId: 'p1',
    propertyName: 'Sunset Apartments',
    unitNumber: '101',
    rentAmount: 1800,
    paymentStatus: 'paid',
    leaseStart: '2023-06-01',
    leaseEnd: '2024-05-31',
    balance: 0,
    createdAt: '2023-05-15',
  },
  {
    id: 't2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '0723456789',
    unitId: 'u2',
    propertyId: 'p1',
    propertyName: 'Sunset Apartments',
    unitNumber: '102',
    rentAmount: 2200,
    paymentStatus: 'pending',
    leaseStart: '2023-08-01',
    leaseEnd: '2024-07-31',
    balance: 2200,
    createdAt: '2023-07-20',
  },
  {
    id: 't3',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '0734567890',
    unitId: 'u4',
    propertyId: 'p1',
    propertyName: 'Sunset Apartments',
    unitNumber: '202',
    rentAmount: 3000,
    paymentStatus: 'overdue',
    leaseStart: '2023-04-01',
    leaseEnd: '2024-03-31',
    balance: 6000,
    createdAt: '2023-03-15',
  },
  {
    id: 't4',
    name: 'James Wilson',
    email: 'jwilson@email.com',
    phone: '0745678901',
    unitId: 'u5',
    propertyId: 'p2',
    propertyName: 'Harbor View Condos',
    unitNumber: 'A1',
    rentAmount: 3000,
    paymentStatus: 'paid',
    leaseStart: '2023-09-01',
    leaseEnd: '2024-08-31',
    balance: 0,
    createdAt: '2023-08-20',
  },
  {
    id: 't5',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '0756789012',
    unitId: 'u6',
    propertyId: 'p2',
    propertyName: 'Harbor View Condos',
    unitNumber: 'A2',
    rentAmount: 3500,
    paymentStatus: 'paid',
    leaseStart: '2023-07-01',
    leaseEnd: '2024-06-30',
    balance: 0,
    createdAt: '2023-06-15',
  },
  {
    id: 't6',
    name: 'David Kim',
    email: 'dkim@email.com',
    phone: '0767890123',
    unitId: 'u7',
    propertyId: 'p3',
    propertyName: 'Downtown Lofts',
    unitNumber: '1A',
    rentAmount: 3500,
    paymentStatus: 'pending',
    leaseStart: '2023-10-01',
    leaseEnd: '2024-09-30',
    balance: 3500,
    createdAt: '2023-09-20',
  },
]

// UPDATED: Invoices with sequential numbers and payment method
// Note: Invoices and Payments are the same - one invoice = one payment
export let invoices = [
  {
    id: 'INV-0001',
    tenantId: 't1',
    tenantName: 'Sarah Johnson',
    propertyName: 'Sunset Apartments',
    unitNumber: '101',
    amount: 1800,
    dueDate: '2024-01-01',
    paidDate: '2023-12-28',
    status: 'paid',
    method: 'M-Pesa',
    items: [
      { description: 'Monthly Rent', amount: 1700 },
      { description: 'Service Fee', amount: 100 }
    ],
    createdAt: '2023-12-15T10:00:00Z',
  },
  {
    id: 'INV-0002',
    tenantId: 't2',
    tenantName: 'Michael Chen',
    propertyName: 'Sunset Apartments',
    unitNumber: '102',
    amount: 2200,
    dueDate: '2024-01-01',
    paidDate: null,
    status: 'pending',
    method: 'bank transfer',
    items: [
      { description: 'Monthly Rent', amount: 2100 },
      { description: 'Service Fee', amount: 100 }
    ],
    createdAt: '2023-12-15T11:00:00Z',
  },
  {
    id: 'INV-0003',
    tenantId: 't3',
    tenantName: 'Emily Davis',
    propertyName: 'Sunset Apartments',
    unitNumber: '202',
    amount: 3000,
    dueDate: '2023-12-01',
    paidDate: null,
    status: 'overdue',
    method: 'bank transfer',
    items: [
      { description: 'Monthly Rent', amount: 2900 },
      { description: 'Service Fee', amount: 100 }
    ],
    createdAt: '2023-11-15T09:00:00Z',
  },
  {
    id: 'INV-0004',
    tenantId: 't4',
    tenantName: 'James Wilson',
    propertyName: 'Harbor View Condos',
    unitNumber: 'A1',
    amount: 3000,
    dueDate: '2024-01-01',
    paidDate: '2024-01-01',
    status: 'paid',
    method: 'M-Pesa',
    items: [
      { description: 'Monthly Rent', amount: 2850 },
      { description: 'Service Fee', amount: 150 }
    ],
    createdAt: '2023-12-15T12:00:00Z',
  },
]

// UPDATED: Payments array now references invoices (they're the same data)
export const payments = invoices

// Maintenance Requests
export const maintenanceRequests = [
  {
    id: 'm1',
    title: 'Leaking faucet in bathroom',
    description:
      'The bathroom sink faucet has been dripping constantly for the past week. Water is pooling around the base.',
    propertyId: 'p1',
    propertyName: 'Sunset Apartments',
    unitNumber: '101',
    tenantId: 't1',
    tenantName: 'Sarah Johnson',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'Mike the Plumber',
    createdAt: '2024-01-10T10:30:00',
    updatedAt: '2024-01-11T14:00:00',
    comments: [
      {
        author: 'Mike the Plumber',
        text: 'Scheduled for tomorrow morning',
        createdAt: '2024-01-11T14:00:00',
      },
    ],
  },
  {
    id: 'm2',
    title: 'AC not cooling properly',
    description:
      'The air conditioning unit is running but not cooling the apartment. Temperature stays around 80°F even when set to 68°F.',
    propertyId: 'p1',
    propertyName: 'Sunset Apartments',
    unitNumber: '202',
    tenantId: 't3',
    tenantName: 'Emily Davis',
    priority: 'high',
    status: 'open',
    createdAt: '2024-01-12T09:00:00',
    updatedAt: '2024-01-12T09:00:00',
    comments: [],
  },
  {
    id: 'm3',
    title: 'Broken window lock',
    description:
      "The lock on the bedroom window is broken and won't secure properly. Security concern.",
    propertyId: 'p2',
    propertyName: 'Harbor View Condos',
    unitNumber: 'A1',
    tenantId: 't4',
    tenantName: 'James Wilson',
    priority: 'urgent',
    status: 'open',
    createdAt: '2024-01-13T16:45:00',
    updatedAt: '2024-01-13T16:45:00',
    comments: [],
  },
  {
    id: 'm4',
    title: 'Light fixture replacement',
    description:
      "Kitchen ceiling light fixture stopped working. Tried replacing bulb but still doesn't work.",
    propertyId: 'p3',
    propertyName: 'Downtown Lofts',
    unitNumber: '1A',
    tenantId: 't6',
    tenantName: 'David Kim',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Building Maintenance',
    createdAt: '2024-01-05T11:20:00',
    updatedAt: '2024-01-08T15:30:00',
    comments: [
      {
        author: 'Building Maintenance',
        text: 'Replaced fixture with new LED unit',
        createdAt: '2024-01-08T15:30:00',
      },
    ],
  },
]

// Notifications
export const notifications = [
  {
    id: 'n1',
    type: 'payment',
    title: 'Payment Received',
    message: 'Sarah Johnson paid $1,800 for Unit 101',
    read: false,
    createdAt: '2024-01-13T10:30:00',
  },
  {
    id: 'n2',
    type: 'payment',
    title: 'Payment Overdue',
    message: 'Emily Davis has overdue payments totaling $6,000',
    read: false,
    createdAt: '2024-01-13T09:00:00',
  },
  {
    id: 'n3',
    type: 'maintenance',
    title: 'New Maintenance Request',
    message: 'Urgent: Broken window lock at Harbor View Condos A1',
    read: false,
    createdAt: '2024-01-13T16:45:00',
  },
  {
    id: 'n4',
    type: 'lease',
    title: 'Lease Expiring Soon',
    message: 'Emily Davis lease expires in 60 days',
    read: true,
    createdAt: '2024-01-12T08:00:00',
  },
  {
    id: 'n5',
    type: 'system',
    title: 'System Update',
    message: 'New payment integration features available',
    read: true,
    createdAt: '2024-01-10T12:00:00',
  },
]

// Payment Integrations
export const paymentIntegrations = [
  {
    id: 'int1',
    name: 'Stripe',
    provider: 'stripe',
    connected: true,
    lastSync: '2024-01-13T10:00:00',
  },
  { id: 'int2', name: 'Razorpay', provider: 'razorpay', connected: false },
  {
    id: 'int3',
    name: 'PayPal',
    provider: 'paypal',
    connected: true,
    lastSync: '2024-01-12T15:30:00',
  },
  {
    id: 'int4',
    name: 'Bank Transfer',
    provider: 'bank',
    connected: true,
    lastSync: '2024-01-13T08:00:00',
  },
]

// Dashboard Stats
export const dashboardStats = {
  totalProperties: properties.length,
  totalUnits: units.length,
  occupiedUnits: units.filter((u) => u.status === 'occupied').length,
  totalTenants: tenants.length,
  monthlyRevenue: properties.reduce((sum, p) => sum + p.monthlyRevenue, 0),
  pendingPayments: payments.filter((p) => p.status === 'pending').length,
  overduePayments: payments.filter((p) => p.status === 'overdue').length,
  openMaintenanceRequests: maintenanceRequests.filter(
    (m) => m.status === 'open' || m.status === 'in_progress',
  ).length,
  occupancyRate: Math.round(
    (units.filter((u) => u.status === 'occupied').length / units.length) * 100,
  ),
}

// Chart Data
export const monthlyRevenueData = [
  { month: 'Aug', revenue: 145000, collected: 142000 },
  { month: 'Sep', revenue: 152000, collected: 148000 },
  { month: 'Oct', revenue: 158000, collected: 155000 },
  { month: 'Nov', revenue: 165000, collected: 160000 },
  { month: 'Dec', revenue: 171000, collected: 165000 },
  { month: 'Jan', revenue: 171000, collected: 158000 },
]

export const paymentStatusData = [
  { name: 'Paid', value: 65, color: '#10b981' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'Overdue', value: 10, color: '#ef4444' },
]

export const occupancyData = [
  { month: 'Aug', rate: 85 },
  { month: 'Sep', rate: 88 },
  { month: 'Oct', rate: 90 },
  { month: 'Nov', rate: 92 },
  { month: 'Dec', rate: 89 },
  { month: 'Jan', rate: 87 },
]

// Recent Activity
export const recentActivity = [
  {
    id: 'a1',
    type: 'payment',
    title: 'Payment received',
    description: 'Sarah Johnson - $1,800',
    time: '2 hours ago',
  },
  {
    id: 'a2',
    type: 'maintenance',
    title: 'New request',
    description: 'Broken window lock - Harbor View',
    time: '5 hours ago',
  },
  {
    id: 'a3',
    type: 'tenant',
    title: 'Lease signed',
    description: 'David Kim - Downtown Lofts 1A',
    time: '1 day ago',
  },
  {
    id: 'a4',
    type: 'payment',
    title: 'Payment overdue',
    description: 'Emily Davis - $3,000',
    time: '2 days ago',
  },
  {
    id: 'a5',
    type: 'maintenance',
    title: 'Request resolved',
    description: 'Light fixture - Downtown Lofts',
    time: '3 days ago',
  },
]

// =====================================================
// HELPER FUNCTIONS TO MANAGE INVOICE DATA
// =====================================================

/**
 * Get the next sequential invoice number
 * Looks at all existing invoices and returns the next number
 */
export function getNextInvoiceNumber() {
  if (invoices.length === 0) return 'INV-0001'
  
  const numbers = invoices.map(inv => {
    const num = inv.id.replace('INV-', '')
    return parseInt(num, 10)
  })
  
  const maxNumber = Math.max(...numbers)
  const nextNumber = maxNumber + 1
  
  return `INV-${String(nextNumber).padStart(4, '0')}`
}

/**
 * Add a new invoice to the list
 * @param {Object} invoiceData - The invoice data to add
 * @returns {Object} The newly created invoice
 */
export function addInvoice(invoiceData) {
  const newInvoice = {
    ...invoiceData,
    id: getNextInvoiceNumber(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    paidDate: null,
  }
  
  invoices = [newInvoice, ...invoices]
  return newInvoice
}

/**
 * Update an existing invoice
 * @param {string} invoiceId - The ID of the invoice to update
 * @param {Object} updates - The fields to update
 */
export function updateInvoice(invoiceId, updates) {
  invoices = invoices.map(inv => 
    inv.id === invoiceId ? { ...inv, ...updates } : inv
  )
}

/**
 * Mark an invoice as paid
 * @param {string} invoiceId - The ID of the invoice to mark as paid
 */
export function markInvoiceAsPaid(invoiceId) {
  invoices = invoices.map(inv => 
    inv.id === invoiceId 
      ? { ...inv, status: 'paid', paidDate: new Date().toISOString() }
      : inv
  )
}

/**
 * Delete an invoice
 * @param {string} invoiceId - The ID of the invoice to delete
 */
export function deleteInvoice(invoiceId) {
  invoices = invoices.filter(inv => inv.id !== invoiceId)
}

/**
 * Get a single invoice by ID
 * @param {string} invoiceId - The ID of the invoice to find
 * @returns {Object|undefined} The invoice or undefined if not found
 */
export function getInvoiceById(invoiceId) {
  return invoices.find(inv => inv.id === invoiceId)
}

/**
 * Get all invoices
 * @returns {Array} All invoices
 */
export function getAllInvoices() {
  return invoices
}