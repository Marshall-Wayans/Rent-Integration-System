import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { occupancyData } from '../../utils/mockData'

export function OccupancyChart() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">
          Occupancy Rate
        </h3>
        <p className="text-sm text-slate-400">
          6-month trend
        </p>
      </CardHeader>

      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={occupancyData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[70, 100]}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9',
              }}
              formatter={(value) => [`${value}%`, 'Occupancy']}
            />

            <Line
              type="monotone"
              dataKey="rate"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{
                fill: '#06b6d4',
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: '#06b6d4',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}