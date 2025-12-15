"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Heart, 
  Brain, 
  Target, 
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  BarChart3,
  PieChart,
  LineChart,
  Lightbulb,
  Users,
  BookOpen,
  DollarSign,
  Shield,
  Thermometer,
  Droplets,
  Zap,
  Moon,
  ActivitySquare,
  Briefcase
} from "lucide-react";

interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  recommendation: string;
}

interface CareerMetric {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  recommendation: string;
}

interface Prediction {
  category: 'health' | 'career';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  actionItems: string[];
  priority: 'high' | 'medium' | 'low';
}

interface Insight {
  id: string;
  type: 'health' | 'career' | 'performance';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  timestamp: Date;
}

export function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [careerMetrics, setCareerMetrics] = useState<CareerMetric[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock health metrics
      setHealthMetrics([
        {
          name: "Sleep Quality",
          value: 7.2,
          unit: "hours",
          status: "good",
          trend: "up",
          recommendation: "Maintain consistent sleep schedule for optimal performance"
        },
        {
          name: "Stress Level",
          value: 65,
          unit: "%",
          status: "warning",
          trend: "down",
          recommendation: "Practice daily meditation and breathing exercises"
        },
        {
          name: "Physical Activity",
          value: 8500,
          unit: "steps/day",
          status: "excellent",
          trend: "up",
          recommendation: "Keep up the great work! Consider adding strength training"
        },
        {
          name: "Heart Rate",
          value: 72,
          unit: "bpm",
          status: "good",
          trend: "stable",
          recommendation: "Normal resting heart rate. Monitor during intense activities"
        },
        {
          name: "Hydration",
          value: 2.1,
          unit: "liters/day",
          status: "warning",
          trend: "down",
          recommendation: "Increase water intake to 2.5-3 liters daily"
        }
      ]);

      // Mock career metrics
      setCareerMetrics([
        {
          name: "Training Progress",
          value: 78,
          unit: "%",
          status: "good",
          trend: "up",
          recommendation: "Complete remaining modules for certification"
        },
        {
          name: "Performance Score",
          value: 8.7,
          unit: "/10",
          status: "excellent",
          trend: "up",
          recommendation: "Excellent performance! Consider leadership training"
        },
        {
          name: "Attendance Rate",
          value: 96,
          unit: "%",
          status: "excellent",
          trend: "stable",
          recommendation: "Outstanding attendance! Maintain this consistency"
        },
        {
          name: "Skill Development",
          value: 12,
          unit: "skills",
          status: "good",
          trend: "up",
          recommendation: "Focus on advanced surveillance techniques next"
        },
        {
          name: "Career Growth",
          value: 15,
          unit: "% growth",
          status: "good",
          trend: "up",
          recommendation: "On track for promotion. Prepare for supervisor role"
        }
      ]);

      // Mock predictions
      setPredictions([
        {
          category: 'health',
          title: "Stress Burnout Risk",
          description: "Based on current stress levels and sleep patterns, there's a moderate risk of burnout in the next 2-3 months if interventions aren't implemented.",
          confidence: 78,
          timeframe: "2-3 months",
          actionItems: [
            "Implement daily 10-minute meditation sessions",
            "Ensure 7-8 hours of consistent sleep",
            "Take regular breaks during long shifts",
            "Consider speaking with a mental health professional"
          ],
          priority: 'high'
        },
        {
          category: 'career',
          title: "Promotion Readiness",
          description: "Your current performance metrics and training completion suggest high readiness for a Team Leader position within the next 6 months.",
          confidence: 85,
          timeframe: "4-6 months",
          actionItems: [
            "Complete leadership training course",
            "Mentor junior security guards",
            "Take on additional responsibilities",
            "Update resume with recent achievements"
          ],
          priority: 'medium'
        },
        {
          category: 'health',
          title: "Physical Fitness Decline",
          description: "Current activity levels show a declining trend that may impact job performance in 4-5 months without intervention.",
          confidence: 65,
          timeframe: "4-5 months",
          actionItems: [
            "Join the company fitness program",
            "Set daily step goals",
            "Incorporate strength training 2x/week",
            "Monitor progress with fitness tracker"
          ],
          priority: 'medium'
        },
        {
          category: 'career',
          title: "Skill Gap Opportunity",
          description: "Analysis shows a growing demand for cybersecurity skills in security positions. Developing these skills could increase earning potential by 25-30%.",
          confidence: 92,
          timeframe: "6-8 months",
          actionItems: [
            "Enroll in cybersecurity fundamentals course",
            "Attend industry workshops on digital security",
            "Practice with online security simulations",
            "Network with cybersecurity professionals"
          ],
          priority: 'low'
        }
      ]);

      // Mock insights
      setInsights([
        {
          id: "1",
          type: "health",
          title: "Sleep Quality Improvement",
          description: "Your sleep quality has improved by 15% this month, correlating with better daytime alertness and performance scores.",
          impact: "high",
          actionable: true,
          timestamp: new Date()
        },
        {
          id: "2",
          type: "career",
          title: "Training Efficiency",
          description: "You complete training modules 30% faster than average, suggesting strong learning aptitude and potential for advanced certifications.",
          impact: "medium",
          actionable: true,
          timestamp: new Date()
        },
        {
          id: "3",
          type: "performance",
          title: "Peak Performance Hours",
          description: "Your performance metrics show peak efficiency between 6-9 AM. Consider scheduling important tasks during this window.",
          impact: "medium",
          actionable: true,
          timestamp: new Date()
        }
      ]);

      setIsLoading(false);
    };

    loadAnalyticsData();
  }, [selectedPeriod]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Activity className="h-4 w-4 text-gray-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your data and generating insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
        <p className="text-gray-600">AI-powered insights for your health and career</p>
      </div>

      {/* Period Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Analysis Period:</span>
            </div>
            <div className="flex space-x-2">
              {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
                <Button
                  key={period}
                  size="sm"
                  variant={selectedPeriod === period ? "default" : "outline"}
                  onClick={() => setSelectedPeriod(period)}
                  className="capitalize"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health Insights</TabsTrigger>
          <TabsTrigger value="career">Career Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Health Score */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>Health Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">82/100</div>
                  <Progress value={82} className="mb-2" />
                  <p className="text-sm text-gray-600">Good health status</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+5% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Score */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <span>Career Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">87/100</div>
                  <Progress value={87} className="mb-2" />
                  <p className="text-sm text-gray-600">Excellent progress</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+8% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Wellness */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>Overall Wellness</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">85/100</div>
                  <Progress value={85} className="mb-2" />
                  <p className="text-sm text-gray-600">Well balanced</p>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+6% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Recent Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.map((insight) => (
                  <div key={insight.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.impact === 'high' ? 'bg-red-500' :
                      insight.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {insight.type}
                        </Badge>
                        {insight.actionable && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Actionable
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Insights Tab */}
        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(metric.trend)}
                      <Badge className={`text-xs ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold">
                      {metric.value} {metric.unit}
                    </div>
                  </div>
                  <Progress 
                    value={metric.name === "Stress Level" ? 100 - metric.value : metric.value} 
                    className="mb-3" 
                  />
                  <p className="text-xs text-gray-600 text-center">
                    {metric.recommendation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Health Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Personalized Health Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Immediate Actions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Increase water intake to 2.5L daily</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Practice 10-minute meditation daily</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Maintain consistent sleep schedule</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Long-term Goals</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Achieve 10,000 daily steps consistently</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Reduce stress levels below 50%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Improve sleep quality to 8+ hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Analytics Tab */}
        <TabsContent value="career" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(metric.trend)}
                      <Badge className={`text-xs ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold">
                      {metric.value} {metric.unit}
                    </div>
                  </div>
                  <Progress value={metric.value} className="mb-3" />
                  <p className="text-xs text-gray-600 text-center">
                    {metric.recommendation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Career Path Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Career Growth Path</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Current: Security Guard</h4>
                      <p className="text-sm text-gray-600">Excelling in current role</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Next: Team Leader</h4>
                      <p className="text-sm text-gray-600">4-6 months timeline</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center">
                      <Brain className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Future: Supervisor</h4>
                      <p className="text-sm text-gray-600">1-2 years timeline</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">Goal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {predictions.map((prediction, index) => (
              <Card key={index} className={`border-l-4 ${
                prediction.priority === 'high' ? 'border-l-red-500' :
                prediction.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      {prediction.category === 'health' ? (
                        <Heart className="h-5 w-5 text-red-600" />
                      ) : (
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      )}
                      <span>{prediction.title}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getPriorityColor(prediction.priority)}`}>
                        {prediction.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {prediction.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {prediction.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Prediction Confidence</span>
                      <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </span>
                    </div>
                    <Progress value={prediction.confidence} />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Timeline: {prediction.timeframe}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Recommended Actions:</h4>
                    <div className="space-y-1">
                      {prediction.actionItems.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insights Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI Analysis Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Findings:</strong> Our AI analysis indicates you're on a positive trajectory 
                  for both health and career development. Focus on stress management and skill development 
                  to maximize your potential. The predictions suggest high readiness for career advancement 
                  within the next 6 months.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <p className="text-sm text-gray-600">Career Growth Potential</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">82%</div>
                  <p className="text-sm text-gray-600">Health Optimization</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">78%</div>
                  <p className="text-sm text-gray-600">Overall Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}