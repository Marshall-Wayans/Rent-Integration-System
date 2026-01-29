import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  UserIcon,
  BuildingIcon,
  SettingsIcon,
  CreditCardIcon,
  SaveIcon,
  UploadIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { Avatar } from '../components/ui/Avatar'
import { Tabs, TabPanel } from '../components/ui/Tabs'
import { IntegrationCard } from '../components/payments/IntegrationCard'
import { paymentIntegrations } from '../utils/mockData'

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

export function SettingsPage() {
  const fileInputRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState('')

  // Profile
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  // Company
  const [companyData, setCompanyData] = useState({
    companyName: '',
    taxId: '',
    bankAccount: '****4567',
  })

  // System
  const [systemData, setSystemData] = useState({
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    rentDueDay: '1',
  })

  // Load from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    const savedCompany = localStorage.getItem('userCompany')
    const savedSystem = localStorage.getItem('userSystem')
    const savedPhoto = localStorage.getItem('userPhoto')

    if (savedProfile) setProfileData(JSON.parse(savedProfile))
    if (savedCompany) setCompanyData(JSON.parse(savedCompany))
    if (savedSystem) setSystemData(JSON.parse(savedSystem))
    if (savedPhoto) setProfilePhoto(savedPhoto)
  }, [])

  // Notify TopBar of updates
  const notifyTopBarUpdate = () => {
    window.dispatchEvent(new Event('userDataUpdated'))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG)')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setProfilePhoto(base64String)
      localStorage.setItem('userPhoto', base64String)

      notifyTopBarUpdate()
      toast.success('Photo uploaded successfully!')
    }

    reader.readAsDataURL(file)
  }

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem('userProfile', JSON.stringify(profileData))
    notifyTopBarUpdate()

    setIsLoading(false)
    toast.success('Profile updated successfully!')
  }

  const handleSaveCompany = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem('userCompany', JSON.stringify(companyData))

    setIsLoading(false)
    toast.success('Company information updated successfully!')
  }

  const handleSaveSystem = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem('userSystem', JSON.stringify(systemData))

    setIsLoading(false)
    toast.success('System preferences updated successfully!')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <UserIcon className="w-4 h-4" /> },
    {
      id: 'company',
      label: 'Company',
      icon: <BuildingIcon className="w-4 h-4" />,
    },
    {
      id: 'system',
      label: 'System',
      icon: <SettingsIcon className="w-4 h-4" />,
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: <CreditCardIcon className="w-4 h-4" />,
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your account and preferences</p>
      </div>

      <Tabs tabs={tabs} defaultTab="profile">
        {/* Profile */}
        <TabPanel tabId="profile" activeTab="profile">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">
                Profile Information
              </h3>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={profilePhoto}
                  name={profileData.name || 'User'}
                  size="xl"
                />

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePhotoClick}
                    leftIcon={<UploadIcon className="w-4 h-4" />}
                  >
                    Change Photo
                  </Button>

                  <p className="text-sm text-slate-500 mt-2">
                    JPG, PNG. Max 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter your full name"
                />

                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      email: e.target.value,
                    })
                  }
                  placeholder="your@email.com"
                />

                <Input
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  isLoading={isLoading}
                  leftIcon={<SaveIcon className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Company */}
        <TabPanel tabId="company" activeTab="profile">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">
                Company Information
              </h3>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  value={companyData.companyName}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      companyName: e.target.value,
                    })
                  }
                  placeholder="Your Company LLC"
                />

                <Input
                  label="Tax ID / EIN"
                  value={companyData.taxId}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      taxId: e.target.value,
                    })
                  }
                  placeholder="12-3456789"
                />

                <Input
                  label="Bank Account"
                  value={companyData.bankAccount}
                  disabled
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveCompany}
                  isLoading={isLoading}
                  leftIcon={<SaveIcon className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* System */}
        <TabPanel tabId="system" activeTab="profile">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">
                System Preferences
              </h3>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Currency"
                  options={currencyOptions}
                  value={systemData.currency}
                  onChange={(e) =>
                    setSystemData({
                      ...systemData,
                      currency: e.target.value,
                    })
                  }
                />

                <Select
                  label="Timezone"
                  options={timezoneOptions}
                  value={systemData.timezone}
                  onChange={(e) =>
                    setSystemData({
                      ...systemData,
                      timezone: e.target.value,
                    })
                  }
                />

                <Input
                  label="Rent Due Day"
                  type="number"
                  min="1"
                  max="28"
                  value={systemData.rentDueDay}
                  onChange={(e) =>
                    setSystemData({
                      ...systemData,
                      rentDueDay: e.target.value,
                    })
                  }
                  hint="Day of month when rent is due"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveSystem}
                  isLoading={isLoading}
                  leftIcon={<SaveIcon className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Integrations */}
        <TabPanel tabId="integrations" activeTab="profile">
          <div className="space-y-4">
            <p className="text-slate-400">
              Connect payment providers to accept rent payments online.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={() =>
                    toast.success(`${integration.name} connected!`)
                  }
                  onDisconnect={() =>
                    toast.success(`${integration.name} disconnected`)
                  }
                />
              ))}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
