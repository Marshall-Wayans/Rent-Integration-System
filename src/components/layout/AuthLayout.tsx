import React from 'react'
import { motion } from 'framer-motion'
import { HomeIcon } from 'lucide-react'

function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-surface-dark flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-600 to-accent-cyan relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                <div className="relative z-10 flex flex-col justify-center px-12 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <HomeIcon className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">RentFlow</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Property Management
                            <br />
                            Made Simple
                        </h1>
                        <p className="text-lg text-white/80 max-w-md">
                            Streamline your rental business with our modern platform. Manage
                            properties, tenants, and payments all in one place.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 grid grid-cols-3 gap-6"
                    >
                        {[
                            { label: 'Properties', value: '500+' },
                            { label: 'Tenants', value: '2,000+' },
                            { label: 'Collected', value: '$5M+' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-white/70">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-md"
                >
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
                            <HomeIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">RentFlow</span>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                        {subtitle && <p className="text-slate-400">{subtitle}</p>}
                    </div>

                    {children}
                </motion.div>
            </div>
        </div>
    )
}

export { AuthLayout }