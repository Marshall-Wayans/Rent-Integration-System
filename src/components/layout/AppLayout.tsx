import React from 'react'      
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'  

function AppLayout() {
    return (
        <div className="min-h-screen bg-surface-dark">
            <Sidebar />
            <div className="ml-[260px] transition-all duration-300">
                <TopBar />
                <main className="p-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>
        </div>
    )
}

export { AppLayout }
