import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon, RefreshCwIcon } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { formatDateTime } from '../../utils/formatters'

function IntegrationCard({ integration, onConnect, onDisconnect }) {
  const providerLogos = {
    stripe: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    razorpay: 'https://razorpay.com/assets/razorpay-logo.svg',
    paypal: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
    bank: '',
  }

  const providerColors = {
    stripe: 'from-purple-500/20 to-indigo-500/20',
    razorpay: 'from-blue-500/20 to-cyan-500/20',
    paypal: 'from-blue-600/20 to-blue-400/20',
    bank: 'from-emerald-500/20 to-teal-500/20',
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className={`p-6 bg-gradient-to-br ${providerColors[integration.provider]}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {integration.provider === 'bank' ? (
              <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                <span className="text-2xl">🏦</span>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2">
                <img
                  src={providerLogos[integration.provider]}
                  alt={integration.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
              <p className="text-sm text-slate-400 capitalize">{integration.provider} Integration</p>
            </div>
          </div>
          <Badge variant={integration.connected ? 'success' : 'default'} dot>
            {integration.connected ? 'Connected' : 'Not Connected'}
          </Badge>
        </div>

        {integration.connected && integration.lastSync && (
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <RefreshCwIcon className="w-4 h-4" />
            <span>Last synced: {formatDateTime(integration.lastSync)}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {integration.connected ? (
            <>
              <Button variant="outline" size="sm" className="flex-1">Settings</Button>
              <Button variant="ghost" size="sm" onClick={onDisconnect}>Disconnect</Button>
            </>
          ) : (
            <Button size="sm" className="flex-1" onClick={onConnect}>Connect</Button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export { IntegrationCard }