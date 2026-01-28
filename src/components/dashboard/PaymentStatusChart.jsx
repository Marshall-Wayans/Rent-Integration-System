import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { paymentStatusData } from '../../utils/mockData'

export function PaymentStatusChart() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Payment Status</h3>
        <p className="text-sm text-slate-400">Current month breakdown</p>
      </CardHeader>

      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
                formatter={(value) => [`${value}%`, '']}
              />

              <Legend
                verticalAlign="bottom"
                formatter={(value) => (
                  <span className="text-slate-300 text-sm">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
