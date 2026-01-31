import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { DashboardPage } from './pages/DashboardPage'
import { PropertiesPage } from './pages/properties/PropertiesPage'
import { PropertyDetailPage } from './pages/properties/PropertyDetailPage'
import { AddPropertyPage } from './pages/properties/AddPropertyPage'
import { TenantsPage } from './pages/tenants/TenantsPage'
import { TenantDetailPage } from './pages/tenants/TenantDetailPage'
import { AddTenantPage } from './pages/tenants/AddTenantPage'
import { PaymentsPage } from './pages/payments/PaymentsPage'
import { PaymentDetailPage } from './pages/payments/PaymentDetailPage'
import { InvoicesPage } from './pages/payments/InvoicesPage'
import { MaintenancePage } from './pages/maintenance/MaintenancePage'
import { MaintenanceDetailPage } from './pages/maintenance/MaintenanceDetailPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { SettingsPage } from './pages/SettingsPage'

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

// Public Route Component
function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  if (isAuthenticated) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/add" element={<AddPropertyPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/tenants" element={<TenantsPage />} />
          <Route path="/tenants/add" element={<AddTenantPage />} />
          <Route path="/tenants/:id" element={<TenantDetailPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/payments/:id" element={<PaymentDetailPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/maintenance/:id" element={<MaintenanceDetailPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}