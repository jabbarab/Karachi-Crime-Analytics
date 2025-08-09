"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lightbulb, TrendingUp, AlertTriangle, Target, Shield, Users, MapPin, Clock } from "lucide-react"

const keyInsights = [
  {
    category: "Geographic Hotspots",
    icon: MapPin,
    priority: "High",
    insights: [
      "Saddar area accounts for 11.8% of total crimes, highest in the city",
      "Commercial areas show 40% higher crime rates than residential zones",
      "Tourist areas (Clifton Beach) require enhanced security during peak hours",
      "Industrial zones (Korangi) show increasing trend (+15% this quarter)",
    ],
    impact: "Critical",
    color: "red",
  },
  {
    category: "Temporal Patterns",
    icon: Clock,
    priority: "High",
    insights: [
      "Summer months show 33.9% of annual crimes - highest seasonal concentration",
      "Evening hours (6-8 PM) are peak crime time with 2,100+ incidents",
      "Fridays account for 16.8% of weekly crimes",
      "Early morning hours (2-4 AM) are safest with only 156 incidents",
    ],
    impact: "High",
    color: "orange",
  },
  {
    category: "Demographic Profiles",
    icon: Users,
    priority: "Medium",
    insights: [
      "75.1% of suspects are male, aged 18-35 years",
      "32.1% of suspects are unemployed - strong correlation with crime",
      "49.7% have primary education or below",
      "Youth (18-25) represent 35.7% of all crime suspects",
    ],
    impact: "Medium",
    color: "yellow",
  },
  {
    category: "Crime Types",
    icon: Shield,
    priority: "High",
    insights: [
      "Vehicle theft leads at 18.6% of all crimes",
      "Property crimes account for 68% of total incidents",
      "Street crimes show seasonal variation with summer peaks",
      "Drug-related crimes concentrated in specific neighborhoods",
    ],
    impact: "High",
    color: "blue",
  },
]

const strategicRecommendations = [
  {
    title: "Enhanced Patrol Strategy",
    description:
      "Deploy additional patrols in Saddar, Clifton, and Korangi during peak hours (6-8 PM) and summer months",
    priority: "Immediate",
    resources: "High",
    timeline: "1-2 weeks",
  },
  {
    title: "Youth Intervention Programs",
    description: "Launch targeted programs for 18-35 age group focusing on employment and education opportunities",
    priority: "Medium",
    resources: "Medium",
    timeline: "3-6 months",
  },
  {
    title: "Commercial Area Security",
    description: "Implement enhanced security measures in commercial zones with CCTV and private security coordination",
    priority: "High",
    resources: "High",
    timeline: "2-4 weeks",
  },
  {
    title: "Data-Driven Deployment",
    description: "Use predictive analytics for resource allocation based on temporal and geographic patterns",
    priority: "Medium",
    resources: "Low",
    timeline: "1-3 months",
  },
]

const riskFactors = [
  { factor: "Unemployment Rate", correlation: "High (32%)", impact: "Critical" },
  { factor: "Education Level", correlation: "High (50% low education)", impact: "High" },
  { factor: "Age Demographics", correlation: "Medium (65% under 35)", impact: "Medium" },
  { factor: "Seasonal Variation", correlation: "High (Summer +40%)", impact: "High" },
  { factor: "Geographic Concentration", correlation: "High (Top 5 areas = 45%)", impact: "Critical" },
]

export default function KeyInsights() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      case "Immediate":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "text-red-600"
      case "High":
        return "text-orange-600"
      case "Medium":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Lightbulb className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Executive Summary:</strong> Analysis reveals concentrated crime patterns in commercial areas during
          evening hours, with strong correlation to unemployment and education levels. Immediate intervention required
          in top 5 high-risk areas.
        </AlertDescription>
      </Alert>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {keyInsights.map((insight, index) => {
          const IconComponent = insight.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`h-5 w-5 text-${insight.color}-600`} />
                    <span>{insight.category}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(insight.priority)}>{insight.priority} Priority</Badge>
                    <Badge variant="outline" className={getImpactColor(insight.impact)}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insight.insights.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <div className={`w-2 h-2 bg-${insight.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span>Strategic Recommendations</span>
          </CardTitle>
          <CardDescription>Actionable recommendations based on data analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategicRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                  <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Resources: {rec.resources}</span>
                  <span>Timeline: {rec.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Factor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Risk Factor Analysis</span>
          </CardTitle>
          <CardDescription>Key factors contributing to crime patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{factor.factor}</h4>
                  <p className="text-sm text-gray-600">Correlation: {factor.correlation}</p>
                </div>
                <Badge
                  className={
                    getImpactColor(factor.impact).includes("red")
                      ? "bg-red-100 text-red-800 border-red-200"
                      : getImpactColor(factor.impact).includes("orange")
                        ? "bg-orange-100 text-orange-800 border-orange-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }
                >
                  {factor.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Predictive Insights</span>
          </CardTitle>
          <CardDescription>Future trends and projections based on current data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Next Quarter Forecast</h4>
              <p className="text-sm text-blue-800">
                Expected 8-12% increase in summer months. Vehicle theft and street crimes likely to peak in June-July.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-2">Emerging Patterns</h4>
              <p className="text-sm text-yellow-800">
                Cyber crimes showing upward trend. New hotspots emerging in developing areas of the city.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Intervention Impact</h4>
              <p className="text-sm text-green-800">
                Targeted interventions could reduce crime by 15-20% in high-risk areas within 6 months.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
