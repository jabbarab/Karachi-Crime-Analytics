"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const areaData = [
  { area: "Saddar", crimes: 2890, risk: "High" },
  { area: "Clifton", crimes: 2456, risk: "High" },
  { area: "Gulshan", crimes: 2234, risk: "Medium" },
  { area: "N.Nazimabad", crimes: 2098, risk: "Medium" },
  { area: "Korangi", crimes: 1987, risk: "High" },
  { area: "Malir", crimes: 1876, risk: "Medium" },
  { area: "Lyari", crimes: 1654, risk: "High" },
  { area: "Defence", crimes: 1543, risk: "Low" },
  { area: "Landhi", crimes: 1432, risk: "Medium" },
  { area: "Orangi", crimes: 1321, risk: "High" },
  { area: "Baldia", crimes: 1198, risk: "Medium" },
  { area: "Kemari", crimes: 1087, risk: "Medium" },
]

const crimeTypeData = [
  { type: "Vehicle Theft", count: 4567, percentage: 18.6 },
  { type: "Burglary", count: 3890, percentage: 15.8 },
  { type: "Street Crime", count: 3245, percentage: 13.2 },
  { type: "Fraud", count: 2876, percentage: 11.7 },
  { type: "Assault", count: 2543, percentage: 10.4 },
  { type: "Drug Related", count: 2234, percentage: 9.1 },
  { type: "Domestic Violence", count: 1987, percentage: 8.1 },
  { type: "Others", count: 3225, percentage: 13.1 },
]

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#f97316", "#06b6d4", "#84cc16"]

export default function CrimeOverviewCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Crime Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Crime Types Distribution</span>
          </CardTitle>
          <CardDescription>Breakdown of crime categories across Karachi</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Crime Count",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={crimeTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                  labelLine={false}
                >
                  {crimeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Crime by Area - Horizontal Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Crime by Area</span>
          </CardTitle>
          <CardDescription>Crime incidents across major Karachi areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {areaData.map((area, index) => {
              const maxCrimes = Math.max(...areaData.map((item) => item.crimes))
              const percentage = (area.crimes / maxCrimes) * 100
              const barColor =
                area.risk === "High" ? "bg-red-500" : area.risk === "Medium" ? "bg-yellow-500" : "bg-green-500"

              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium w-24 truncate">{area.area}</span>
                    <span className="text-sm font-mono">{area.crimes.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div
                      className={`h-4 ${barColor} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-white text-xs font-bold">{area.risk}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-xs">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-xs">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs">Low Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crime Statistics Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Crime Statistics Summary</CardTitle>
          <CardDescription>Key performance indicators and crime metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">68%</div>
              <div className="text-sm text-blue-800">Property Crimes</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">23%</div>
              <div className="text-sm text-red-800">Violent Crimes</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">45%</div>
              <div className="text-sm text-green-800">Solved Cases</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">12%</div>
              <div className="text-sm text-purple-800">Repeat Offenders</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
