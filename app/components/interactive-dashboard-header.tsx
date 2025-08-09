"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Shield,
  AlertTriangle,
  BarChart3,
  Activity,
  Zap,
  RefreshCw,
  Bell,
  Settings,
} from "lucide-react"

interface DashboardHeaderProps {
  onRefresh?: () => void
  onNotificationToggle?: (enabled: boolean) => void
  onAutoRefreshToggle?: (enabled: boolean) => void
}

export default function InteractiveDashboardHeader({
  onRefresh,
  onNotificationToggle,
  onAutoRefreshToggle,
}: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [liveStats, setLiveStats] = useState({
    totalCrimes: 24567,
    areasMonitored: 45,
    crimeTypes: 28,
    riskScore: 7.2,
    trend: -5.2,
  })

  // Simulate live data updates
  useEffect(() => {
    if (autoRefreshEnabled) {
      const interval = setInterval(() => {
        setLiveStats((prev) => ({
          ...prev,
          totalCrimes: prev.totalCrimes + Math.floor(Math.random() * 10) - 5,
          riskScore: Math.max(0, Math.min(10, prev.riskScore + (Math.random() - 0.5) * 0.2)),
          trend: prev.trend + (Math.random() - 0.5) * 2,
        }))
        setLastUpdated(new Date())
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [autoRefreshEnabled])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
    onRefresh?.()
  }

  const handleNotificationToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled)
    onNotificationToggle?.(enabled)
  }

  const handleAutoRefreshToggle = (enabled: boolean) => {
    setAutoRefreshEnabled(enabled)
    onAutoRefreshToggle?.(enabled)
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Controls */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Karachi Crime Analytics</h1>
                <p className="text-blue-100">Interactive Executive Dashboard - Real-time Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Controls */}
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                <Bell className="h-4 w-4" />
                <Switch checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
                <span className="text-sm">Alerts</span>
              </div>

              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                <Zap className="h-4 w-4" />
                <Switch checked={autoRefreshEnabled} onCheckedChange={handleAutoRefreshToggle} />
                <span className="text-sm">Live</span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Updating..." : "Refresh"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Interactive Status Bar */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
            <Activity className="h-3 w-3 mr-1" />
            {autoRefreshEnabled ? "Live Data" : "Static Data"}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </Badge>
          {notificationsEnabled && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <Bell className="h-3 w-3 mr-1" />
              Alerts Active
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Settings className="h-4 w-4" />
          <span>Dashboard Status: Active</span>
        </div>
      </div>

      {/* Interactive Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:scale-105 transition-transform cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
              Total Crime Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{liveStats.totalCrimes.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1 flex items-center">
              {liveStats.trend < 0 ? (
                <TrendingDown className="inline h-3 w-3 mr-1" />
              ) : (
                <TrendingUp className="inline h-3 w-3 mr-1" />
              )}
              {liveStats.trend.toFixed(1)}% from last period
            </p>
            {autoRefreshEnabled && (
              <div className="w-full h-1 bg-white/20 rounded mt-2 overflow-hidden">
                <div className="h-full bg-white/60 rounded animate-pulse"></div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:scale-105 transition-transform cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
              Areas Monitored
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{liveStats.areasMonitored}</div>
            <p className="text-xs opacity-75 mt-1 flex items-center">
              <MapPin className="inline h-3 w-3 mr-1" />
              Complete coverage
            </p>
            <div className="flex space-x-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:scale-105 transition-transform cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
              Crime Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{liveStats.crimeTypes}</div>
            <p className="text-xs opacity-75 mt-1 flex items-center">
              <BarChart3 className="inline h-3 w-3 mr-1" />
              Categorized & tracked
            </p>
            <div className="grid grid-cols-4 gap-1 mt-2">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-1 bg-white/40 rounded animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-105 transition-transform cursor-pointer group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{liveStats.riskScore.toFixed(1)}/10</div>
            <p className="text-xs opacity-75 mt-1 flex items-center">
              <AlertTriangle className="inline h-3 w-3 mr-1" />
              High priority areas
            </p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div
                className="bg-white/80 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(liveStats.riskScore / 10) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
