"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Filter, RotateCcw, Eye, EyeOff, Zap } from "lucide-react"

const areaData = [
  { area: "Saddar", crimes: 2890, risk: "High", change: "+12%", population: 850000, lat: 24.8607, lng: 67.0011 },
  { area: "Clifton", crimes: 2456, risk: "High", change: "-3%", population: 720000, lat: 24.8138, lng: 67.0299 },
  { area: "Gulshan", crimes: 2234, risk: "Medium", change: "+8%", population: 1200000, lat: 24.9265, lng: 67.0822 },
  { area: "N.Nazimabad", crimes: 2098, risk: "Medium", change: "0%", population: 900000, lat: 24.9056, lng: 67.0364 },
  { area: "Korangi", crimes: 1987, risk: "High", change: "+15%", population: 2500000, lat: 24.8546, lng: 67.1134 },
  { area: "Malir", crimes: 1876, risk: "Medium", change: "-5%", population: 2000000, lat: 24.8943, lng: 67.2093 },
  { area: "Lyari", crimes: 1654, risk: "High", change: "+18%", population: 600000, lat: 24.87, lng: 66.975 },
  { area: "Defence", crimes: 1543, risk: "Low", change: "-8%", population: 500000, lat: 24.8059, lng: 67.03 },
  { area: "Landhi", crimes: 1432, risk: "Medium", change: "+2%", population: 1800000, lat: 24.8418, lng: 67.1941 },
  { area: "Orangi", crimes: 1321, risk: "High", change: "+22%", population: 2400000, lat: 24.9441, lng: 66.9734 },
  { area: "Baldia", crimes: 1198, risk: "Medium", change: "+5%", population: 1500000, lat: 24.9441, lng: 66.9734 },
  { area: "Kemari", crimes: 1087, risk: "Medium", change: "-2%", population: 800000, lat: 24.7936, lng: 66.975 },
]

const crimeTypeData = [
  { type: "Vehicle Theft", count: 4567, percentage: 18.6, color: "#3b82f6" },
  { type: "Burglary", count: 3890, percentage: 15.8, color: "#ef4444" },
  { type: "Street Crime", count: 3245, percentage: 13.2, color: "#f59e0b" },
  { type: "Fraud", count: 2876, percentage: 11.7, color: "#10b981" },
  { type: "Assault", count: 2543, percentage: 10.4, color: "#8b5cf6" },
  { type: "Drug Related", count: 2234, percentage: 9.1, color: "#f97316" },
  { type: "Domestic Violence", count: 1987, percentage: 8.1, color: "#06b6d4" },
  { type: "Others", count: 3225, percentage: 13.1, color: "#84cc16" },
]

export default function InteractiveCrimeCharts() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedCrimeType, setSelectedCrimeType] = useState<string | null>(null)
  const [riskFilter, setRiskFilter] = useState<string>("All")
  const [crimeThreshold, setCrimeThreshold] = useState([0])
  const [showAnimation, setShowAnimation] = useState(true)
  const [viewMode, setViewMode] = useState("bars")
  const [sortBy, setSortBy] = useState("crimes")

  // Filter and sort data based on selections
  const filteredData = areaData
    .filter((area) => {
      if (riskFilter !== "All" && area.risk !== riskFilter) return false
      if (area.crimes < crimeThreshold[0]) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "crimes") return b.crimes - a.crimes
      if (sortBy === "area") return a.area.localeCompare(b.area)
      if (sortBy === "risk") return a.risk.localeCompare(b.risk)
      return 0
    })

  const maxCrimes = Math.max(...filteredData.map((item) => item.crimes))

  const handleAreaClick = (area: string) => {
    setSelectedArea(selectedArea === area ? null : area)
  }

  const handleCrimeTypeClick = (crimeType: string) => {
    setSelectedCrimeType(selectedCrimeType === crimeType ? null : crimeType)
  }

  const resetFilters = () => {
    setSelectedArea(null)
    setSelectedCrimeType(null)
    setRiskFilter("All")
    setCrimeThreshold([0])
    setSortBy("crimes")
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Interactive Controls</span>
            <Button size="sm" variant="outline" onClick={resetFilters} className="ml-auto bg-transparent">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Risk Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Level Filter</label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Risk Levels</SelectItem>
                  <SelectItem value="High">High Risk Only</SelectItem>
                  <SelectItem value="Medium">Medium Risk Only</SelectItem>
                  <SelectItem value="Low">Low Risk Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Crime Threshold */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Crime Count: {crimeThreshold[0]}</label>
              <Slider
                value={crimeThreshold}
                onValueChange={setCrimeThreshold}
                max={3000}
                min={0}
                step={100}
                className="w-full"
              />
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crimes">Crime Count</SelectItem>
                  <SelectItem value="area">Area Name</SelectItem>
                  <SelectItem value="risk">Risk Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium">View Mode</label>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={viewMode === "bars" ? "default" : "outline"}
                  onClick={() => setViewMode("bars")}
                >
                  Bars
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  size="sm"
                  variant={showAnimation ? "default" : "outline"}
                  onClick={() => setShowAnimation(!showAnimation)}
                >
                  {showAnimation ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedArea || selectedCrimeType || riskFilter !== "All" || crimeThreshold[0] > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm font-medium">Active Filters:</span>
              {selectedArea && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedArea(null)}>
                  Area: {selectedArea} ×
                </Badge>
              )}
              {selectedCrimeType && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCrimeType(null)}>
                  Crime: {selectedCrimeType} ×
                </Badge>
              )}
              {riskFilter !== "All" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setRiskFilter("All")}>
                  Risk: {riskFilter} ×
                </Badge>
              )}
              {crimeThreshold[0] > 0 && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setCrimeThreshold([0])}>
                  Min Crimes: {crimeThreshold[0]} ×
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Crime Types Pie Chart */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Interactive Crime Types</span>
              {selectedCrimeType && <Badge variant="outline">Selected: {selectedCrimeType}</Badge>}
            </CardTitle>
            <CardDescription>Click on segments to filter data</CardDescription>
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
                    onClick={(data) => handleCrimeTypeClick(data.type)}
                  >
                    {crimeTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={selectedCrimeType === entry.type ? "#000" : "none"}
                        strokeWidth={selectedCrimeType === entry.type ? 3 : 0}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border rounded shadow-lg">
                            <p className="font-semibold">{data.type}</p>
                            <p className="text-blue-600">Count: {data.count}</p>
                            <p className="text-gray-600">Percentage: {data.percentage}%</p>
                            <p className="text-xs text-gray-500 mt-1">Click to filter</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Interactive Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Interactive Crime by Area</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Showing {filteredData.length} areas</span>
              </div>
            </CardTitle>
            <CardDescription>Click on areas to view details • Hover for info</CardDescription>
          </CardHeader>
          <CardContent>
            {viewMode === "bars" ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredData.map((area, index) => {
                  const percentage = (area.crimes / maxCrimes) * 100
                  const isSelected = selectedArea === area.area
                  const barColor = getRiskColor(area.risk)

                  return (
                    <div
                      key={index}
                      className={`space-y-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleAreaClick(area.area)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{area.area}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono font-bold">{area.crimes.toLocaleString()}</span>
                          <Badge
                            className={
                              area.risk === "High"
                                ? "bg-red-100 text-red-800"
                                : area.risk === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {area.risk}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                        <div
                          className={`h-4 ${barColor} rounded-full flex items-center justify-end pr-2 ${
                            showAnimation ? "transition-all duration-1000 ease-out" : ""
                          }`}
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-white text-xs font-bold">{area.change}</span>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-2 p-2 bg-white rounded border text-xs space-y-1 animate-in slide-in-from-top-2">
                          <div>Population: {area.population.toLocaleString()}</div>
                          <div>Crime Rate: {((area.crimes / area.population) * 1000).toFixed(2)} per 1,000</div>
                          <div>
                            Coordinates: {area.lat}, {area.lng}
                          </div>
                          <div>Trend: {area.change}</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredData.map((area, index) => {
                  const isSelected = selectedArea === area.area
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${getRiskColor(
                        area.risk,
                      )} text-white ${isSelected ? "ring-4 ring-blue-400" : ""}`}
                      onClick={() => handleAreaClick(area.area)}
                    >
                      <div className="text-lg font-bold">{area.crimes}</div>
                      <div className="text-sm opacity-90">{area.area}</div>
                      <div className="text-xs opacity-75 mt-1">{area.risk} Risk</div>
                      <div className="text-xs opacity-75">{area.change}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Stats */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Live Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{filteredData.length}</div>
              <div className="text-sm text-purple-800">Areas Shown</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {filteredData.reduce((sum, area) => sum + area.crimes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-blue-800">Total Crimes</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-red-600">
                {filteredData.filter((area) => area.risk === "High").length}
              </div>
              <div className="text-sm text-red-800">High Risk Areas</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {filteredData.filter((area) => area.change.startsWith("-")).length}
              </div>
              <div className="text-sm text-green-800">Improving Areas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
