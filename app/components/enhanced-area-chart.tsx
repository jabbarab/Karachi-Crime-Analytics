"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapPin, TrendingUp, AlertTriangle } from "lucide-react"

const completeAreaData = [
  { area: "Saddar", crimes: 2890, risk: "High", change: "+12%", population: "850K" },
  { area: "Clifton", crimes: 2456, risk: "High", change: "-3%", population: "720K" },
  { area: "Gulshan-e-Iqbal", crimes: 2234, risk: "Medium", change: "+8%", population: "1.2M" },
  { area: "North Nazimabad", crimes: 2098, risk: "Medium", change: "0%", population: "900K" },
  { area: "Korangi", crimes: 1987, risk: "High", change: "+15%", population: "2.5M" },
  { area: "Malir", crimes: 1876, risk: "Medium", change: "-5%", population: "2.0M" },
  { area: "Lyari", crimes: 1654, risk: "High", change: "+18%", population: "600K" },
  { area: "Defence (DHA)", crimes: 1543, risk: "Low", change: "-8%", population: "500K" },
  { area: "Landhi", crimes: 1432, risk: "Medium", change: "+2%", population: "1.8M" },
  { area: "Orangi Town", crimes: 1321, risk: "High", change: "+22%", population: "2.4M" },
  { area: "Baldia Town", crimes: 1198, risk: "Medium", change: "+5%", population: "1.5M" },
  { area: "Kemari", crimes: 1087, risk: "Medium", change: "-2%", population: "800K" },
  { area: "New Karachi", crimes: 987, risk: "Low", change: "-10%", population: "1.1M" },
  { area: "Shah Faisal", crimes: 876, risk: "Medium", change: "+7%", population: "700K" },
  { area: "Bin Qasim", crimes: 654, risk: "Low", change: "-15%", population: "400K" },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "High":
      return "#ef4444"
    case "Medium":
      return "#f59e0b"
    case "Low":
      return "#10b981"
    default:
      return "#6b7280"
  }
}

const getRiskBadgeColor = (risk: string) => {
  switch (risk) {
    case "High":
      return "bg-red-100 text-red-800 border-red-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "Low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function EnhancedAreaChart() {
  return (
    <div className="space-y-6">
      {/* Horizontal Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Crime Distribution by Area</span>
          </CardTitle>
          <CardDescription>Complete breakdown of crime incidents across all major Karachi areas</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              crimes: {
                label: "Crime Incidents",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[600px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={completeAreaData}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="area" type="category" width={110} fontSize={11} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value, name) => [value, "Crime Incidents"]}
                  labelFormatter={(label) => `Area: ${label}`}
                />
                <Bar dataKey="crimes" radius={[0, 4, 4, 0]}>
                  {completeAreaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getRiskColor(entry.risk)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Area Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Detailed Area Analysis</span>
          </CardTitle>
          <CardDescription>Comprehensive crime statistics with risk assessment and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Area</th>
                  <th className="text-right p-2 font-semibold">Crime Count</th>
                  <th className="text-center p-2 font-semibold">Risk Level</th>
                  <th className="text-right p-2 font-semibold">Trend</th>
                  <th className="text-right p-2 font-semibold">Population</th>
                  <th className="text-right p-2 font-semibold">Crime Rate*</th>
                </tr>
              </thead>
              <tbody>
                {completeAreaData.map((area, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{area.area}</td>
                    <td className="p-2 text-right font-mono">{area.crimes.toLocaleString()}</td>
                    <td className="p-2 text-center">
                      <Badge className={getRiskBadgeColor(area.risk)}>{area.risk}</Badge>
                    </td>
                    <td className="p-2 text-right">
                      <span
                        className={
                          area.change.startsWith("+")
                            ? "text-red-600"
                            : area.change.startsWith("-")
                              ? "text-green-600"
                              : "text-gray-600"
                        }
                      >
                        {area.change.startsWith("+") && <TrendingUp className="inline h-3 w-3 mr-1" />}
                        {area.change.startsWith("-") && <TrendingUp className="inline h-3 w-3 mr-1 rotate-180" />}
                        {area.change}
                      </span>
                    </td>
                    <td className="p-2 text-right text-gray-600">{area.population}</td>
                    <td className="p-2 text-right font-mono">
                      {(
                        (area.crimes / Number.parseFloat(area.population.replace(/[KM]/g, ""))) *
                        (area.population.includes("M") ? 1000 : 1)
                      ).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">* Crime rate per 1,000 population</p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Level Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h3 className="font-semibold text-red-900">High Risk Areas</h3>
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">5 Areas</div>
            <p className="text-sm text-red-800">Saddar, Clifton, Korangi, Lyari, Orangi</p>
            <p className="text-xs text-red-700 mt-2">Require immediate intervention</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <h3 className="font-semibold text-yellow-900">Medium Risk Areas</h3>
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">7 Areas</div>
            <p className="text-sm text-yellow-800">Enhanced monitoring needed</p>
            <p className="text-xs text-yellow-700 mt-2">Preventive measures recommended</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold text-green-900">Low Risk Areas</h3>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">3 Areas</div>
            <p className="text-sm text-green-800">Defence, New Karachi, Bin Qasim</p>
            <p className="text-xs text-green-700 mt-2">Maintain current security levels</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
