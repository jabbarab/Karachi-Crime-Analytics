"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Briefcase, Target } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const genderData = [
  { gender: "Male", count: 18456, percentage: 75.1 },
  { gender: "Female", count: 4234, percentage: 17.2 },
  { gender: "Unknown", count: 1877, percentage: 7.7 },
]

const ageData = [
  { ageGroup: "18-25", count: 8765, percentage: 35.7 },
  { ageGroup: "26-35", count: 7234, percentage: 29.4 },
  { ageGroup: "36-45", count: 4567, percentage: 18.6 },
  { ageGroup: "46-55", count: 2345, percentage: 9.5 },
  { ageGroup: "55+", count: 1656, percentage: 6.8 },
]

const educationData = [
  { level: "No Education", count: 6789, percentage: 27.6 },
  { level: "Primary", count: 5432, percentage: 22.1 },
  { level: "Secondary", count: 4567, percentage: 18.6 },
  { level: "Higher Secondary", count: 3456, percentage: 14.1 },
  { level: "Graduate", count: 2345, percentage: 9.5 },
  { level: "Post Graduate", count: 1234, percentage: 5.0 },
  { level: "Unknown", count: 744, percentage: 3.1 },
]

const occupationData = [
  { occupation: "Unemployed", count: 7890, percentage: 32.1 },
  { occupation: "Labor", count: 4567, percentage: 18.6 },
  { occupation: "Driver", count: 3456, percentage: 14.1 },
  { occupation: "Shopkeeper", count: 2345, percentage: 9.5 },
  { occupation: "Student", count: 2234, percentage: 9.1 },
  { occupation: "Office Worker", count: 1876, percentage: 7.6 },
  { occupation: "Others", count: 2199, percentage: 9.0 },
]

const COLORS = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#f97316", "#06b6d4"]

export default function DemographicAnalysis() {
  return (
    <div className="space-y-6">
      {/* Gender Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Gender Distribution</span>
            </CardTitle>
            <CardDescription>Crime suspects by gender</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Age Distribution</span>
            </CardTitle>
            <CardDescription>Crime suspects by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px]"
            >
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Education Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            <span>Education Level Analysis</span>
          </CardTitle>
          <CardDescription>Educational background of crime suspects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={educationData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="level" type="category" width={120} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Key Education Insights</h4>
              {educationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{item.level}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.percentage}%</Badge>
                    <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Occupation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-orange-600" />
            <span>Occupation Analysis</span>
          </CardTitle>
          <CardDescription>Professional background of crime suspects</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Count",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={occupationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="occupation" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Demographic Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Demographic Insights & Patterns</CardTitle>
          <CardDescription>Key findings from demographic analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-2">High-Risk Demographics</h4>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Males aged 18-35 (65% of crimes)</li>
                <li>• Unemployed individuals (32%)</li>
                <li>• Low education levels (50%)</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">Socioeconomic Factors</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Unemployment correlation: 32%</li>
                <li>• Education gap impact: 50%</li>
                <li>• Economic stress indicators</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Intervention Opportunities</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Youth programs (18-25 age group)</li>
                <li>• Job training initiatives</li>
                <li>• Education support programs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
