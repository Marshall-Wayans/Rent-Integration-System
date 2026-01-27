import React, { useState } from 'react'
import { UserIcon, BuildingIcon, SettingsIcon, CreditCardIcon, SaveIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { Tabs, TabPanel } from '../components/ui/Tabs'
import { IntegrationCard } from '../components/payments/IntegrationCard'
import { currentUser, paymentIntegrations } from '../utils/mockData'

const currencyOptions = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'INR', label: 'INR - Indian Rupee' },
]

const timezoneOptions = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
]

function Header() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <p className="text-slate-400">Manage your account and preferences</p>
    </div>
  )
}

function ProfileTab({ profileData, setProfileData, handleSave, isLoading }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Profile Information</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="xl" />
          <div>
            <Button variant="outline" size="sm">Change Photo</Button>
            <p className="text-sm text-slate-500 mt-2">JPG, PNG. Max 2MB</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
          <Input
            label="Phone"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} isLoading={isLoading} leftIcon={<SaveIcon className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CompanyTab({ companyData, setCompanyData, handleSave, isLoading }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Company Information</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            value={companyData.companyName}
            onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
          />
          <Input
            label="Tax ID / EIN"
            value={companyData.taxId}
            onChange={(e) => setCompanyData({ ...companyData, taxId: e.target.value })}
          />
          <Input label="Bank Account" value={companyData.bankAccount} disabled />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} isLoading={isLoading} leftIcon={<SaveIcon className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SystemTab({ systemData, setSystemData, handleSave, isLoading }) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">System Preferences</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Currency"
            options={currencyOptions}
            value={systemData.currency}
            onChange={(e) => setSystemData({ ...systemData, currency: e.target.value })}
          />
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={systemData.timezone}
            onChange={(e) => setSystemData({ ...systemData, timezone: e.target.value })}
          />
          <Input
            label="Rent Due Day"
            type="number"
            min="1"
            max="28"
            value={systemData.rentDueDay}
            onChange={(e) => setSystemData({ ...systemData, rentDueDay: e.target.value })}
            hint="Day of month when rent is due"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} isLoading={isLoading} leftIcon={<SaveIcon className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function IntegrationsTab() {
  return (
    <div className="space-y-4">
      <p className="text-slate-400">
        Connect payment providers to accept rent payments online.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={() => toast.success(`${integration.name} connected!`)}
            onDisconnect={() => toast.success(`${integration.name} disconnected`)}
          />
        ))}
      </div>
    </div>
  )
}

function SettingsPageContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
  })
  const [companyData, setCompanyData] = useState({
    companyName: 'RentFlow Properties LLC',
    taxId: '12-3456789',
    bankAccount: '****4567',
  })
  const [systemData, setSystemData] = useState({
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    rentDueDay: '1',
  })

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success('Settings saved successfully!')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'company', label: 'Company', icon: <BuildingIcon className="w-4 h-4" /> },
    { id: 'system', label: 'System', icon: <SettingsIcon className="w-4 h-4" /> },
    { id: 'integrations', label: 'Integrations', icon: <CreditCardIcon className="w-4 h-4" /> },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      <Header />
      <Tabs tabs={tabs} defaultTab="profile">
        <TabPanel tabId="profile" activeTab="profile">
          <ProfileTab
            profileData={profileData}
            setProfileData={setProfileData}
            handleSave={handleSave}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel tabId="company" activeTab="profile">
          <CompanyTab
            companyData={companyData}
            setCompanyData={setCompanyData}
            handleSave={handleSave}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel tabId="system" activeTab="profile">
          <SystemTab
            systemData={systemData}
            setSystemData={setSystemData}
            handleSave={handleSave}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel tabId="integrations" activeTab="profile">
          <IntegrationsTab />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export { SettingsPageContent as SettingsPage }
