"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Award, 
  Star,
  TrendingUp,
  FileText,
  Shield,
  Heart,
  Video,
  CheckSquare
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  completed: boolean;
  enrolled: boolean;
  instructor: string;
  rating: number;
  lessons: number;
  icon: any;
}

interface CertificateRecord {
  id: string;
  courseName: string;
  issueDate: string;
  certificateId: string;
  verified: boolean;
}

export function TrainingDevelopment() {
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: "1",
      title: "Fire Safety Training",
      description: "Learn essential fire safety protocols and emergency response",
      category: "Safety",
      duration: "2 hours",
      difficulty: "Beginner",
      progress: 100,
      completed: true,
      enrolled: true,
      instructor: "Fire Safety Expert",
      rating: 4.8,
      lessons: 5,
      icon: Shield,
    },
    {
      id: "2",
      title: "First Aid & Medical Emergency",
      description: "Comprehensive first aid training for security personnel",
      category: "Medical",
      duration: "3 hours",
      difficulty: "Beginner",
      progress: 75,
      completed: false,
      enrolled: true,
      instructor: "Medical Professional",
      rating: 4.9,
      lessons: 8,
      icon: Heart,
    },
    {
      id: "3",
      title: "CCTV Monitoring & Surveillance",
      description: "Master CCTV operations and surveillance techniques",
      category: "Technical",
      duration: "4 hours",
      difficulty: "Intermediate",
      progress: 30,
      completed: false,
      enrolled: true,
      instructor: "Security Expert",
      rating: 4.7,
      lessons: 10,
      icon: Video,
    },
    {
      id: "4",
      title: "Crowd Control Management",
      description: "Effective crowd management and conflict resolution",
      category: "Management",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      progress: 0,
      completed: false,
      enrolled: false,
      instructor: "Crowd Management Specialist",
      rating: 4.6,
      lessons: 6,
      icon: Users,
    },
    {
      id: "5",
      title: "Visitor Management System",
      description: "Professional visitor handling and registration processes",
      category: "Operations",
      duration: "1.5 hours",
      difficulty: "Beginner",
      progress: 0,
      completed: false,
      enrolled: false,
      instructor: "Operations Manager",
      rating: 4.5,
      lessons: 4,
      icon: FileText,
    },
    {
      id: "6",
      title: "Soft Skills & Communication",
      description: "Enhance communication and interpersonal skills",
      category: "Personal Development",
      duration: "3 hours",
      difficulty: "Beginner",
      progress: 0,
      completed: false,
      enrolled: false,
      instructor: "Communication Expert",
      rating: 4.8,
      lessons: 7,
      icon: Users,
    },
  ];

  const certificates: CertificateRecord[] = [
    {
      id: "1",
      courseName: "Fire Safety Training",
      issueDate: "2024-01-15",
      certificateId: "SM-FS-2024-001",
      verified: true,
    },
  ];

  const careerPaths = [
    {
      title: "Senior Security Guard",
      description: "Lead security operations and team management",
      requirements: ["2+ years experience", "Fire Safety certified", "First Aid certified"],
      salaryRange: "₹25,000 - ₹35,000",
    },
    {
      title: "Security Supervisor",
      description: "Supervise security teams and manage operations",
      requirements: ["3+ years experience", "All basic certifications", "Leadership skills"],
      salaryRange: "₹35,000 - ₹50,000",
    },
    {
      title: "Security Manager",
      description: "Manage complete security operations for organizations",
      requirements: ["5+ years experience", "Advanced certifications", "Management experience"],
      salaryRange: "₹50,000 - ₹80,000",
    },
  ];

  const handleEnrollCourse = (course: Course) => {
    setSelectedCourse(course);
    alert(`Enrolled in "${course.title}" successfully!`);
  };

  const handleStartCourse = (course: Course) => {
    alert(`Starting "${course.title}"...`);
  };

  const tabs = [
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "career", label: "Career Path", icon: TrendingUp },
    { id: "psara", label: "PSARA Exam", icon: FileText },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Training & Development</h1>
        <p className="text-gray-600">Enhance your skills and advance your career</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">6</p>
            <p className="text-xs text-gray-600">Available Courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-xs text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">1</p>
            <p className="text-xs text-gray-600">Certificates</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Available Courses</h3>
            <Badge variant="outline">{courses.length} courses</Badge>
          </div>
          
          <div className="space-y-3">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      course.completed ? "bg-green-100" : "bg-blue-100"
                    }`}>
                      <course.icon className={`h-6 w-6 ${
                        course.completed ? "text-green-600" : "text-blue-600"
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-gray-600">{course.description}</p>
                        </div>
                        {course.completed && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Play className="h-3 w-3" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      
                      {course.enrolled && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        {course.enrolled ? (
                          course.completed ? (
                            <Button variant="outline" size="sm">
                              <Award className="h-4 w-4 mr-1" />
                              View Certificate
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => handleStartCourse(course)}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Play className="h-4 w-4 mr-1" />
                              Continue
                            </Button>
                          )
                        ) : (
                          <Button 
                            onClick={() => handleEnrollCourse(course)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Enroll Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "certificates" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">My Certificates</h3>
          
          {certificates.length > 0 ? (
            <div className="space-y-3">
              {certificates.map((cert) => (
                <Card key={cert.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                          <Award className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{cert.courseName}</h4>
                          <p className="text-sm text-gray-600">ID: {cert.certificateId}</p>
                          <p className="text-xs text-gray-500">Issued: {cert.issueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {cert.verified ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline">Pending</Badge>
                        )}
                        <Button variant="outline" size="sm" className="mt-2">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No certificates yet</p>
                <p className="text-sm text-gray-500">Complete courses to earn certificates</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "career" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Career Growth Path</h3>
          
          <div className="space-y-4">
            {careerPaths.map((path, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{path.title}</h4>
                      <p className="text-sm text-gray-600">{path.description}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      ₹{path.salaryRange}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Requirements:</p>
                    <div className="space-y-1">
                      {path.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-center space-x-2">
                          <CheckSquare className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-4 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">Career Guidance</p>
                  <p className="text-sm text-orange-700">
                    Get personalized career advice and mentorship from industry experts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "psara" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">PSARA Exam Preparation</h3>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <FileText className="h-16 w-16 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold">Private Security Agencies Regulation Act</h4>
                <p className="text-sm text-gray-600">Mandatory certification for security professionals</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">100+</p>
                  <p className="text-xs text-gray-600">Practice Questions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">95%</p>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Study Material</p>
                      <p className="text-xs text-gray-600">Comprehensive guide</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Play className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">Mock Tests</p>
                      <p className="text-xs text-gray-600">Practice exams</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Start</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-sm">Video Lectures</p>
                      <p className="text-xs text-gray-600">Expert guidance</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Watch</Button>
                </div>
              </div>
              
              <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Start PSARA Preparation
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}