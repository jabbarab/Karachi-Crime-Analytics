"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, TrendingUp, Clock, Activity } from "lucide-react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Bar, BarChart, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyTrends = [
  { month: "Jan 2023", crimes: 1890, trend: "↓" },
  { month: "Feb 2023", crimes: 2100, trend: "↑" },
  { month: "Mar 2023", crimes: 2350, trend: "↑" },
  { month: "Apr 2023", crimes: 2180, trend: "↓" },
  { month: "May 2023", crimes: 2450, trend: "↑" },
  { month: "Jun 2023", crimes: 2680, trend: "↑" },
  { month: "Jul 2023", crimes: 2890, trend: "↑" },
  { month: "Aug 2023", crimes: 2750, trend: "↓" },
  { month: "Sep 2023", crimes: 2560, trend: "↓" },
  { month: "Oct 2023", crimes: 2340, trend: "↓" },
  { month: "Nov 2023", crimes: 2120, trend: "↓" },
  { month: "Dec 2023", crimes: 1980, trend: "↓" },
]

const seasonalData = [
  { season: "Spring", crimes: 6630, percentage: 27.0 },
  { season: "Summer", crimes: 8320, percentage: 33.9 },
  { season: "Monsoon", crimes: 7450, percentage: 30.3 },
  { season: "Winter", crimes: 2167, percentage: 8.8 },
]

const hourlyPattern = [
  { hour: "00-02", crimes: 234 },
  { hour: "02-04", crimes: 156 },
  { hour: "04-06", crimes: 189 },
  { hour: "06-08", crimes: 567 },
  { hour: "08-10", crimes: 890 },
  { hour: "10-12", crimes: 1234 },
  { hour: "12-14", crimes: 1456 },
  { hour: "14-16", crimes: 1678 },
  { hour: "16-18", crimes: 1890 },
  { hour: "18-20", crimes: 2100 },
  { hour: "20-22", crimes: 1567 },
  { hour: "22-00", crimes: 789 },
]

const weeklyPattern = [
  { day: "Monday", crimes: 3456 },
  { day: "Tuesday", crimes: 3234 },
  { day: "Wednesday", crimes: 3567 },
  { day: "Thursday", crimes: 3789 },
  { day: "Friday", crimes: 4123 },
  { day: "Saturday", crimes: 3890 },
  { day: "Sunday", crimes: 2508 },
]

export default function TimeSeriesAnalysis() {
  return (
    <div className="space-y-6">
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Monthly Crime Trends</span>
          </CardTitle>
          <CardDescription>Crime incidents over the past 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              crimes: {
                label: "Crime Count",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="crimes" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Seasonal and Hourly Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span>Seasonal Patterns</span>
            </CardTitle>
            <CardDescription>Crime distribution across seasons</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                crimes: {
                  label: "Crime Count",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px]"
            >
              <BarChart data={seasonalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="crimes" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>Hourly Crime Pattern</span>
            </CardTitle>
            <CardDescription>Crime incidents by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                crimes: {
                  label: "Crime Count",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px]"
            >
              <LineChart data={hourlyPattern}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="crimes"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-orange-600" />
            <span>Weekly Crime Pattern</span>
          </CardTitle>
          <CardDescription>Crime incidents by day of the week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              crimes: {
                label: "Crime Count",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={weeklyPattern}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="crimes" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Temporal Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Temporal Analysis Insights</CardTitle>
          <CardDescription>Key findings from time-based crime patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Peak Season</h4>
              <p className="text-2xl font-bold text-blue-600">Summer</p>
              <p className="text-sm text-blue-800">33.9% of annual crimes</p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">Peak Hours</h4>
              <p className="text-2xl font-bold text-red-600">6-8 PM</p>
              <p className="text-sm text-red-800">Highest crime activity</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Peak Day</h4>
              <p className="text-2xl font-bold text-yellow-600">Friday</p>
              <p className="text-sm text-yellow-800">16.8% of weekly crimes</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Safest Time</h4>
              <p className="text-2xl font-bold text-green-600">2-4 AM</p>
              <p className="text-sm text-green-800">Lowest crime activity</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Monthly Trend</h4>
              <p className="text-sm text-gray-700">
                Crime rates peak during summer months (June-August) and show declining trend in winter.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Daily Pattern</h4>
              <p className="text-sm text-gray-700">
                Evening hours (6-8 PM) show highest crime activity, coinciding with rush hours and darkness.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Weekly Cycle</h4>
              <p className="text-sm text-gray-700">
                Fridays and weekends show increased crime activity, while Sundays are relatively safer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
