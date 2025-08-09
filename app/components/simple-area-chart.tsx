"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const areaData = [
  { area: "Saddar", crimes: 2890, risk: "High", color: "bg-red-500" },
  { area: "Clifton", crimes: 2456, risk: "High", color: "bg-red-500" },
  { area: "Gulshan-e-Iqbal", crimes: 2234, risk: "Medium", color: "bg-yellow-500" },
  { area: "North Nazimabad", crimes: 2098, risk: "Medium", color: "bg-yellow-500" },
  { area: "Korangi", crimes: 1987, risk: "High", color: "bg-red-500" },
  { area: "Malir", crimes: 1876, risk: "Medium", color: "bg-yellow-500" },
  { area: "Lyari", crimes: 1654, risk: "High", color: "bg-red-500" },
  { area: "Defence (DHA)", crimes: 1543, risk: "Low", color: "bg-green-500" },
  { area: "Landhi", crimes: 1432, risk: "Medium", color: "bg-yellow-500" },
  { area: "Orangi Town", crimes: 1321, risk: "High", color: "bg-red-500" },
  { area: "Baldia Town", crimes: 1198, risk: "Medium", color: "bg-yellow-500" },
  { area: "Kemari", crimes: 1087, risk: "Medium", color: "bg-yellow-500" },
]

const maxCrimes = Math.max(...areaData.map((item) => item.crimes))

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

export default function SimpleAreaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Crime by Area - Visual Bars</span>
        </CardTitle>
        <CardDescription>Crime incidents across major Karachi areas with visual representation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {areaData.map((area, index) => {
            const percentage = (area.crimes / maxCrimes) * 100
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm w-32 truncate">{area.area}</span>
                    <Badge className={getRiskBadgeColor(area.risk)} variant="outline">
                      {area.risk}
                    </Badge>
                  </div>
                  <span className="font-mono text-sm font-semibold">{area.crimes.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`h-full ${area.color} rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2`}
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-white text-xs font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">5</div>
            <div className="text-xs text-red-800">High Risk Areas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">6</div>
            <div className="text-xs text-yellow-800">Medium Risk Areas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">1</div>
            <div className="text-xs text-green-800">Low Risk Areas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
