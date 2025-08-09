"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Users,
  Shield,
  Briefcase,
  GraduationCap,
  Camera,
  Phone,
  AlertTriangle,
  CheckCircle,
  Calendar,
} from "lucide-react"

const immediateActions = [
  {
    title: "Enhanced Patrol Deployment",
    description: "Deploy additional patrol units in Saddar, Clifton, and Korangi during peak hours (6-8 PM)",
    priority: "Critical",
    timeline: "1-2 weeks",
    resources: "50 additional officers",
    cost: "$150,000/month",
    impact: "25-30% crime reduction in target areas",
    status: "Ready to Deploy",
    icon: Shield,
    progress: 85,
  },
  {
    title: "CCTV Network Expansion",
    description: "Install 200 additional CCTV cameras in high-crime commercial areas",
    priority: "High",
    timeline: "3-4 weeks",
    resources: "Technical team, equipment",
    cost: "$500,000 one-time",
    impact: "40% improvement in case resolution",
    status: "Procurement Phase",
    icon: Camera,
    progress: 60,
  },
  {
    title: "Emergency Response Optimization",
    description: "Reduce response time to under 8 minutes in high-risk areas",
    priority: "High",
    timeline: "2-3 weeks",
    resources: "Communication upgrade",
    cost: "$75,000",
    impact: "50% faster response time",
    status: "Planning Phase",
    icon: Phone,
    progress: 40,
  },
]

const mediumTermActions = [
  {
    title: "Youth Employment Program",
    description: "Launch job training and placement program targeting 18-35 age group",
    priority: "Medium",
    timeline: "3-6 months",
    resources: "Training centers, partnerships",
    cost: "$2M annually",
    impact: "15-20% reduction in youth crime",
    status: "Proposal Stage",
    icon: Briefcase,
    progress: 25,
  },
  {
    title: "Community Policing Initiative",
    description: "Establish community liaison officers in each high-crime area",
    priority: "Medium",
    timeline: "2-4 months",
    resources: "20 community officers",
    cost: "$300,000 annually",
    impact: "Improved community relations",
    status: "Recruitment Phase",
    icon: Users,
    progress: 45,
  },
  {
    title: "Education Support Program",
    description: "Adult education and skill development for at-risk populations",
    priority: "Medium",
    timeline: "6-12 months",
    resources: "Educational institutions",
    cost: "$1.5M annually",
    impact: "Long-term crime prevention",
    status: "Partnership Development",
    icon: GraduationCap,
    progress: 20,
  },
]

const longTermStrategies = [
  {
    title: "Smart City Crime Prevention",
    description: "AI-powered predictive policing system with real-time analytics",
    timeline: "12-18 months",
    investment: "$5M",
    impact: "30-40% overall crime reduction",
  },
  {
    title: "Socioeconomic Development",
    description: "Comprehensive poverty alleviation and urban development program",
    timeline: "2-5 years",
    investment: "$50M",
    impact: "Address root causes of crime",
  },
  {
    title: "Regional Security Coordination",
    description: "Inter-city crime prevention and intelligence sharing network",
    timeline: "18-24 months",
    investment: "$10M",
    impact: "Prevent crime displacement",
  },
]

const budgetAllocation = [
  { category: "Personnel", amount: 2500000, percentage: 45 },
  { category: "Technology", amount: 1500000, percentage: 27 },
  { category: "Infrastructure", amount: 800000, percentage: 14 },
  { category: "Community Programs", amount: 500000, percentage: 9 },
  { category: "Training", amount: 300000, percentage: 5 },
]

export default function ActionPlans() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    if (status.includes("Ready") || status.includes("Active")) return "text-green-600"
    if (status.includes("Phase") || status.includes("Procurement")) return "text-blue-600"
    return "text-yellow-600"
  }

  return (
    <div className="space-y-6">
      {/* Immediate Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Immediate Action Plans (0-1 Month)</span>
          </CardTitle>
          <CardDescription>Critical interventions requiring immediate implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {immediateActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Timeline:</span>
                      <p className="text-gray-600">{action.timeline}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Cost:</span>
                      <p className="text-gray-600">{action.cost}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Impact:</span>
                      <p className="text-gray-600">{action.impact}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <p className={getStatusColor(action.status)}>{action.status}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Progress value={action.progress} className="flex-1" />
                    <span className="text-sm font-medium text-gray-600">{action.progress}%</span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Medium-Term Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Medium-Term Strategies (1-6 Months)</span>
          </CardTitle>
          <CardDescription>Strategic initiatives for sustainable crime reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediumTermActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">{action.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{action.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Timeline:</span>
                      <span className="font-medium">{action.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Cost:</span>
                      <span className="font-medium">{action.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Impact:</span>
                      <span className="font-medium text-green-600">{action.impact}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Progress value={action.progress} className="mb-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{action.status}</span>
                      <span className="text-sm font-medium">{action.progress}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Long-Term Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <span>Long-Term Strategic Vision (1-5 Years)</span>
          </CardTitle>
          <CardDescription>Comprehensive transformation initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {longTermStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{strategy.title}</h4>
                  <Badge variant="outline" className="bg-white">
                    {strategy.timeline}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 mb-3">{strategy.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Investment: <strong>{strategy.investment}</strong>
                  </span>
                  <span className="text-green-600 font-medium">{strategy.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Budget Allocation</CardTitle>
          <CardDescription>Proposed budget distribution for crime prevention initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {budgetAllocation.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.category}</h4>
                    <p className="text-sm text-gray-600">${item.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{item.percentage}%</div>
                    <Progress value={item.percentage} className="w-20" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Total Annual Budget</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">$5.6M</div>
              <p className="text-sm text-blue-800 mb-4">
                Comprehensive crime prevention and law enforcement enhancement program
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Expected ROI:</span>
                  <span className="font-medium">300-400%</span>
                </div>
                <div className="flex justify-between">
                  <span>Crime Reduction:</span>
                  <span className="font-medium text-green-600">25-35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Implementation Period:</span>
                  <span className="font-medium">12 months</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Implementation Roadmap</span>
          </CardTitle>
          <CardDescription>Phased approach to action plan execution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="font-semibold text-red-900">Phase 1 (0-1 Month)</div>
              <div className="text-sm text-red-800">
                Deploy enhanced patrols, install CCTV, optimize emergency response
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="font-semibold text-yellow-900">Phase 2 (1-6 Months)</div>
              <div className="text-sm text-yellow-800">
                Launch community programs, youth employment, education initiatives
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="font-semibold text-green-900">Phase 3 (6+ Months)</div>
              <div className="text-sm text-green-800">
                Implement smart city solutions, long-term socioeconomic development
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
