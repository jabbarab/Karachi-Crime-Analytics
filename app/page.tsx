"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Shield,
  Users,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Lightbulb,
} from "lucide-react"
import CrimeOverviewCharts from "./components/crime-overview-charts"
import GeographicAnalysis from "./components/geographic-analysis"
import DemographicAnalysis from "./components/demographic-analysis"
import TimeSeriesAnalysis from "./components/time-series-analysis"
import ActionPlans from "./components/action-plans"
import KeyInsights from "./components/key-insights"

export default function KarachiCrimeDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600">Loading Karachi Crime Analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Karachi Crime Analytics</h1>
                <p className="text-sm text-gray-600">Executive Dashboard - Strategic Crime Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Last Updated: {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Strategic Alert:</strong> Crime patterns show seasonal variations. Immediate action required in
            high-risk areas.
          </AlertDescription>
        </Alert>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Crime Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,567</div>
              <p className="text-xs opacity-75 mt-1">
                <TrendingDown className="inline h-3 w-3 mr-1" />
                -5.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Areas Monitored</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs opacity-75 mt-1">
                <MapPin className="inline h-3 w-3 mr-1" />
                Complete coverage
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Crime Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs opacity-75 mt-1">
                <BarChart3 className="inline h-3 w-3 mr-1" />
                Categorized & tracked
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.2/10</div>
              <p className="text-xs opacity-75 mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                High priority areas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="geographic" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Geographic</span>
            </TabsTrigger>
            <TabsTrigger value="demographic" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Demographics</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="actions" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Action Plans</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CrimeOverviewCharts />
          </TabsContent>

          <TabsContent value="geographic">
            <GeographicAnalysis />
          </TabsContent>

          <TabsContent value="demographic">
            <DemographicAnalysis />
          </TabsContent>

          <TabsContent value="trends">
            <TimeSeriesAnalysis />
          </TabsContent>

          <TabsContent value="insights">
            <KeyInsights />
          </TabsContent>

          <TabsContent value="actions">
            <ActionPlans />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
