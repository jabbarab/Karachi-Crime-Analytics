"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, Shield, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const areaRiskData = [
  { area: "Saddar", crimes: 2890, risk: "High", trend: "↑", change: "+12%" },
  { area: "Clifton", crimes: 2456, risk: "High", trend: "↓", change: "-3%" },
  { area: "Gulshan", crimes: 2234, risk: "Medium", trend: "↑", change: "+8%" },
  { area: "North Nazimabad", crimes: 2098, risk: "Medium", trend: "→", change: "0%" },
  { area: "Korangi", crimes: 1987, risk: "High", trend: "↑", change: "+15%" },
  { area: "Malir", crimes: 1876, risk: "Medium", trend: "↓", change: "-5%" },
  { area: "Lyari", crimes: 1654, risk: "High", trend: "↑", change: "+18%" },
  { area: "Defence", crimes: 1543, risk: "Low", trend: "↓", change: "-8%" },
  { area: "Landhi", crimes: 1432, risk: "Medium", trend: "→", change: "+2%" },
  { area: "Orangi", crimes: 1321, risk: "High", trend: "↑", change: "+22%" },
]

const crimeHotspots = [
  { location: "Saddar Bazaar", lat: "24.8607", lng: "67.0011", incidents: 456, type: "Commercial" },
  { location: "Clifton Beach", lat: "24.8138", lng: "67.0299", incidents: 234, type: "Tourist" },
  { location: "Gulshan Chowrangi", lat: "24.9265", lng: "67.0822", incidents: 345, type: "Traffic" },
  { location: "Korangi Crossing", lat: "24.8546", lng: "67.1134", incidents: 287, type: "Industrial" },
]

export default function GeographicAnalysis() {
  const getRiskColor = (risk: string) => {
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

  const getTrendIcon = (trend: string, change: string) => {
    if (trend === "↑") return <TrendingUp className="h-3 w-3 text-red-500" />
    if (trend === "↓") return <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
    return <div className="h-3 w-3 bg-gray-400 rounded-full" />
  }

  return (
    <div className="space-y-6">
      {/* Area Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Area Risk Assessment</span>
          </CardTitle>
          <CardDescription>Crime incidents and risk levels across Karachi areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {areaRiskData.map((area, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{area.area}</h3>
                  <Badge className={getRiskColor(area.risk)}>{area.risk} Risk</Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{area.crimes.toLocaleString()} incidents</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(area.trend, area.change)}
                    <span
                      className={
                        area.change.startsWith("+")
                          ? "text-red-600"
                          : area.change.startsWith("-")
                            ? "text-green-600"
                            : "text-gray-600"
                      }
                    >
                      {area.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Crime Distribution by Area</CardTitle>
          <CardDescription>Comparative analysis of crime incidents across major areas</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              crimes: {
                label: "Crime Incidents",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[400px]"
          >
            <BarChart data={areaRiskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="crimes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Crime Hotspots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Crime Hotspots</span>
          </CardTitle>
          <CardDescription>High-incident locations requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crimeHotspots.map((hotspot, index) => (
              <div key={index} className="p-4 border rounded-lg bg-red-50 border-red-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-red-900">{hotspot.location}</h3>
                    <p className="text-sm text-red-700">
                      {hotspot.lat}, {hotspot.lng}
                    </p>
                  </div>
                  <Badge variant="destructive">{hotspot.incidents} incidents</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {hotspot.type} Area
                  </Badge>
                  <span className="text-xs text-red-600">High Priority</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span>Geographic Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Commercial Areas</h4>
              <p className="text-sm text-blue-800">
                Saddar and Clifton show highest crime rates due to commercial activity and tourist presence.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Residential Areas</h4>
              <p className="text-sm text-yellow-800">
                North Nazimabad and Gulshan have moderate crime rates with focus on property crimes.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Secure Areas</h4>
              <p className="text-sm text-green-800">
                Defence area maintains lowest crime rates due to enhanced security measures.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
