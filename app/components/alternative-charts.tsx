"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp, AlertTriangle } from "lucide-react"

const areaData = [
  { area: "Saddar", crimes: 2890, risk: "High", change: "+12%" },
  { area: "Clifton", crimes: 2456, risk: "High", change: "-3%" },
  { area: "Gulshan", crimes: 2234, risk: "Medium", change: "+8%" },
  { area: "N.Nazimabad", crimes: 2098, risk: "Medium", change: "0%" },
  { area: "Korangi", crimes: 1987, risk: "High", change: "+15%" },
  { area: "Malir", crimes: 1876, risk: "Medium", change: "-5%" },
  { area: "Lyari", crimes: 1654, risk: "High", change: "+18%" },
  { area: "Defence", crimes: 1543, risk: "Low", change: "-8%" },
  { area: "Landhi", crimes: 1432, risk: "Medium", change: "+2%" },
  { area: "Orangi", crimes: 1321, risk: "High", change: "+22%" },
  { area: "Baldia", crimes: 1198, risk: "Medium", change: "+5%" },
  { area: "Kemari", crimes: 1087, risk: "Medium", change: "-2%" },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "High":
      return "bg-red-500 text-white"
    case "Medium":
      return "bg-yellow-500 text-white"
    case "Low":
      return "bg-green-500 text-white"
    default:
      return "bg-gray-500 text-white"
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

export default function AlternativeCharts() {
  const maxCrimes = Math.max(...areaData.map((item) => item.crimes))

  return (
    <div className="space-y-6">
      {/* Vertical Bar Chart using CSS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Crime Distribution - Vertical Bars</span>
          </CardTitle>
          <CardDescription>Visual representation of crime incidents by area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between space-x-2 h-64 mb-4">
            {areaData.slice(0, 8).map((area, index) => {
              const height = (area.crimes / maxCrimes) * 100
              const barColor =
                area.risk === "High" ? "bg-red-500" : area.risk === "Medium" ? "bg-yellow-500" : "bg-green-500"

              return (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="text-xs font-medium text-center">{area.crimes}</div>
                  <div
                    className={`w-full ${barColor} rounded-t transition-all duration-1000 ease-out flex items-end justify-center pb-1`}
                    style={{ height: `${height}%` }}
                  >
                    <span className="text-white text-xs font-bold transform rotate-90 origin-center">{area.risk}</span>
                  </div>
                  <div className="text-xs text-center font-medium transform -rotate-45 mt-2">{area.area}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Grid Layout Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Area Risk Matrix</span>
          </CardTitle>
          <CardDescription>Crime incidents organized by risk level and area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {areaData.map((area, index) => (
              <div key={index} className="relative">
                <div className={`p-4 rounded-lg ${getRiskColor(area.risk)} text-center`}>
                  <div className="text-lg font-bold">{area.crimes}</div>
                  <div className="text-sm opacity-90">{area.area}</div>
                  <div className="text-xs opacity-75 mt-1">{area.risk} Risk</div>
                </div>
                <div className="absolute -top-2 -right-2">
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      area.change.startsWith("+")
                        ? "bg-red-100 text-red-800"
                        : area.change.startsWith("-")
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {area.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Circular Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span>Crime Intensity Circles</span>
          </CardTitle>
          <CardDescription>Circular representation of crime intensity by area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {areaData.map((area, index) => {
              const percentage = (area.crimes / maxCrimes) * 100
              const circumference = 2 * Math.PI * 40
              const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
              const strokeColor = area.risk === "High" ? "#ef4444" : area.risk === "Medium" ? "#f59e0b" : "#10b981"

              return (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={strokeColor}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-bold">{area.crimes}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium">{area.area}</div>
                    <Badge className={getRiskBadgeColor(area.risk)} variant="outline">
                      {area.risk}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Table View with Visual Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Crime Statistics Table</CardTitle>
          <CardDescription>Complete breakdown with visual indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-semibold">Area</th>
                  <th className="text-center p-3 font-semibold">Crime Count</th>
                  <th className="text-center p-3 font-semibold">Visual</th>
                  <th className="text-center p-3 font-semibold">Risk Level</th>
                  <th className="text-center p-3 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {areaData.map((area, index) => {
                  const percentage = (area.crimes / maxCrimes) * 100
                  const barColor =
                    area.risk === "High" ? "bg-red-500" : area.risk === "Medium" ? "bg-yellow-500" : "bg-green-500"

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{area.area}</td>
                      <td className="p-3 text-center font-mono font-bold">{area.crimes.toLocaleString()}</td>
                      <td className="p-3">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 ${barColor} rounded-full transition-all duration-1000`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={getRiskBadgeColor(area.risk)}>{area.risk}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={
                            area.change.startsWith("+")
                              ? "text-red-600 font-bold"
                              : area.change.startsWith("-")
                                ? "text-green-600 font-bold"
                                : "text-gray-600"
                          }
                        >
                          {area.change.startsWith("+") && <TrendingUp className="inline h-3 w-3 mr-1" />}
                          {area.change.startsWith("-") && <TrendingUp className="inline h-3 w-3 mr-1 rotate-180" />}
                          {area.change}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
