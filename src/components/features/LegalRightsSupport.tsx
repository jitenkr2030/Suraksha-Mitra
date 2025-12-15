"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Scale, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Shield, 
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  MapPin,
  Phone,
  Calendar,
  Award,
  User,
  Building,
  Gavel,
  FileCheck,
  Users,
  AlertTriangle,
  ThumbsUp,
  Eye,
  Download
} from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  available: boolean;
  consultationFee: string;
}

interface LaborRight {
  id: string;
  title: string;
  description: string;
  category: string;
  applicable: string;
}

interface Grievance {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "resolved" | "rejected";
  date: string;
  category: string;
}

interface ContractService {
  id: string;
  name: string;
  service: string;
  description: string;
  turnaround: string;
  cost: string;
}

interface HarassmentSupport {
  id: string;
  type: string;
  description: string;
  support: string[];
  emergency: boolean;
}

interface DocumentService {
  id: string;
  name: string;
  description: string;
  processingTime: string;
  cost: string;
  required: string[];
}

export function LegalRightsSupport() {
  const [activeTab, setActiveTab] = useState("legal-aid");
  const [grievanceForm, setGrievanceForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const lawyers: Lawyer[] = [
    {
      id: "1",
      name: "Adv. Rajesh Sharma",
      specialty: "Labor Law",
      experience: 12,
      rating: 4.8,
      available: true,
      consultationFee: "Free"
    },
    {
      id: "2",
      name: "Adv. Priya Patel",
      specialty: "Employment Law",
      experience: 8,
      rating: 4.6,
      available: true,
      consultationFee: "Free"
    },
    {
      id: "3",
      name: "Adv. Amit Kumar",
      specialty: "Criminal Law",
      experience: 15,
      rating: 4.9,
      available: false,
      consultationFee: "Free"
    }
  ];

  const laborRights: LaborRight[] = [
    {
      id: "1",
      title: "Minimum Wage Guarantee",
      description: "Right to receive minimum wage as per state regulations",
      category: "Wages",
      applicable: "All Security Personnel"
    },
    {
      id: "2",
      title: "Overtime Payment",
      description: "Entitled to 1.5x or 2x pay for overtime work",
      category: "Working Hours",
      applicable: "All Security Personnel"
    },
    {
      id: "3",
      title: "Weekly Rest Day",
      description: "Right to at least one day off per week",
      category: "Working Conditions",
      applicable: "All Security Personnel"
    },
    {
      id: "4",
      title: "Safe Working Environment",
      description: "Employer must provide safe and healthy working conditions",
      category: "Safety",
      applicable: "All Security Personnel"
    },
    {
      id: "5",
      title: "Social Security Benefits",
      description: "PF, ESI, and other statutory benefits",
      category: "Benefits",
      applicable: "Regular Employees"
    }
  ];

  const grievances: Grievance[] = [
    {
      id: "1",
      title: "Salary Delay",
      description: "Salary not received for last 2 months",
      status: "in-progress",
      date: "2024-01-15",
      category: "Payment"
    },
    {
      id: "2",
      title: "Excessive Duty Hours",
      description: "Working 12+ hours daily without overtime pay",
      status: "pending",
      date: "2024-01-20",
      category: "Working Hours"
    },
    {
      id: "3",
      title: "Safety Equipment",
      description: "Not provided with proper safety gear",
      status: "resolved",
      date: "2024-01-10",
      category: "Safety"
    }
  ];

  const contractServices: ContractService[] = [
    {
      id: "1",
      name: "Contract Review",
      service: "Employment Agreement",
      description: "Thorough review of employment contract terms and conditions",
      turnaround: "24-48 hours",
      cost: "Free"
    },
    {
      id: "2",
      name: "Contract Negotiation",
      service: "Terms Improvement",
      description: "Assistance in negotiating better terms and conditions",
      turnaround: "3-5 days",
      cost: "Free"
    },
    {
      id: "3",
      name: "Contract Termination",
      service: "Exit Terms",
      description: "Review of termination clauses and notice periods",
      turnaround: "24 hours",
      cost: "Free"
    }
  ];

  const harassmentSupport: HarassmentSupport[] = [
    {
      id: "1",
      type: "Workplace Harassment",
      description: "Any form of harassment, bullying, or discrimination at workplace",
      support: ["24/7 Helpline", "Confidential Reporting", "Legal Support", "Counseling"],
      emergency: true
    },
    {
      id: "2",
      type: "Sexual Harassment",
      description: "Unwanted sexual advances, comments, or behavior",
      support: ["Immediate Action", "Legal Action", "Protection", "Rehabilitation"],
      emergency: true
    },
    {
      id: "3",
      type: "Verbal Abuse",
      description: "Offensive language, threats, or verbal intimidation",
      support: ["Documentation", "Reporting", "Mediation", "Support"],
      emergency: false
    }
  ];

  const documentServices: DocumentService[] = [
    {
      id: "1",
      name: "Aadhaar Card Services",
      description: "Aadhaar enrollment, update, and correction services",
      processingTime: "7-10 days",
      cost: "Free",
      required: ["Photo", "Address Proof", "Identity Proof"]
    },
    {
      id: "2",
      name: "PAN Card Application",
      description: "New PAN card application and corrections",
      processingTime: "15-20 days",
      cost: "Free",
      required: ["Photo", "Identity Proof", "Address Proof"]
    },
    {
      id: "3",
      name: "Voter ID Services",
      description: "Voter ID registration and updates",
      processingTime: "30-45 days",
      cost: "Free",
      required: ["Photo", "Address Proof", "Age Proof"]
    },
    {
      id: "4",
      name: "Ration Card Services",
      description: "New ration card application and updates",
      processingTime: "21-30 days",
      cost: "Free",
      required: ["Photo", "Address Proof", "Income Proof", "Family Details"]
    }
  ];

  const handleConsultLawyer = (lawyer: Lawyer) => {
    alert(`Consultation request sent to ${lawyer.name}. They will contact you within 24 hours.`);
  };

  const handleFileGrievance = () => {
    if (grievanceForm.title && grievanceForm.description) {
      alert(`Grievance "${grievanceForm.title}" filed successfully. Reference number: GRV${Date.now()}`);
      setGrievanceForm({ title: "", description: "", category: "" });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleRequestContractService = (service: ContractService) => {
    alert(`Request for "${service.name}" submitted. Our legal team will contact you soon.`);
  };

  const handleReportHarassment = (support: HarassmentSupport) => {
    if (support.emergency) {
      alert("🚨 EMERGENCY: Your report has been escalated immediately. Our team will contact you within 1 hour.");
    } else {
      alert(`Report for "${support.type}" submitted. Our support team will contact you within 24 hours.`);
    }
  };

  const handleRequestDocumentService = (service: DocumentService) => {
    alert(`Request for "${service.name}" submitted. Our documentation team will assist you.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const tabs = [
    { id: "legal-aid", label: "Legal Aid", icon: Scale },
    { id: "labor-rights", label: "Labor Rights", icon: BookOpen },
    { id: "grievance", label: "Grievance", icon: MessageSquare },
    { id: "contract", label: "Contract", icon: FileText },
    { id: "harassment", label: "Harassment", icon: Shield },
    { id: "documents", label: "Documents", icon: FileCheck },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Legal & Rights Support</h1>
        <p className="text-gray-600">Protecting your rights and ensuring justice</p>
      </div>

      {/* Emergency Support Card */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900">24/7 Emergency Legal Support</h3>
                <p className="text-sm text-red-700">Immediate assistance for urgent legal matters</p>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Call Now
            </Button>
          </div>
        </CardContent>
      </Card>

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
      {activeTab === "legal-aid" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Legal Experts</h3>
          <div className="space-y-3">
            {lawyers.map((lawyer) => (
              <Card key={lawyer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{lawyer.name}</h4>
                        <Badge variant={lawyer.available ? "default" : "secondary"}>
                          {lawyer.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{lawyer.specialty}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{lawyer.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{lawyer.experience} years exp.</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">{lawyer.consultationFee}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleConsultLawyer(lawyer)}
                      disabled={!lawyer.available}
                      className="ml-4"
                    >
                      {lawyer.available ? "Consult Now" : "Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Free Legal Services</p>
                  <p className="text-sm text-blue-700">
                    All legal consultations and services are completely free for registered security personnel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "labor-rights" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Labor Rights</h3>
          <div className="space-y-3">
            {laborRights.map((right) => (
              <Card key={right.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{right.title}</h4>
                        <Badge variant="outline">{right.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{right.description}</p>
                      <p className="text-xs text-gray-500">Applicable: {right.applicable}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Know Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Eye className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Right to Information</p>
                  <p className="text-xs text-gray-600">Access to all employment-related information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Gavel className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Right to Fair Treatment</p>
                  <p className="text-xs text-gray-600">Equal treatment without discrimination</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Right to Unionize</p>
                  <p className="text-xs text-gray-600">Form or join labor unions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "grievance" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">File a Grievance</h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Grievance Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Brief description of your grievance"
                    value={grievanceForm.title}
                    onChange={(e) => setGrievanceForm({...grievanceForm, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    placeholder="e.g., Payment, Working Hours, Safety"
                    value={grievanceForm.category}
                    onChange={(e) => setGrievanceForm({...grievanceForm, category: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Detailed Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Provide complete details of your grievance"
                    value={grievanceForm.description}
                    onChange={(e) => setGrievanceForm({...grievanceForm, description: e.target.value})}
                  />
                </div>
                <Button
                  onClick={handleFileGrievance}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  File Grievance
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h4 className="font-medium mb-3">Your Recent Grievances</h4>
            <div className="space-y-2">
              {grievances.map((grievance) => (
                <Card key={grievance.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-sm">{grievance.title}</h5>
                          <Badge className={getStatusColor(grievance.status)}>
                            {grievance.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{grievance.description}</p>
                        <p className="text-xs text-gray-500">{grievance.date} • {grievance.category}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="mt-4 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Confidential Process</p>
                  <p className="text-sm text-green-700">
                    All grievances are handled confidentially. Your identity will be protected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "contract" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contract Services</h3>
          <div className="space-y-3">
            {contractServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{service.cost}</p>
                      <p className="text-xs text-gray-500">{service.turnaround}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <Button
                    onClick={() => handleRequestContractService(service)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Request Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Contract Review Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Salary & Benefits</p>
                  <p className="text-xs text-gray-600">Verify salary structure and benefits</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Working Hours</p>
                  <p className="text-xs text-gray-600">Check duty hours and overtime terms</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Termination Clause</p>
                  <p className="text-xs text-gray-600">Review notice period and conditions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Legal Compliance</p>
                  <p className="text-xs text-gray-600">Ensure compliance with labor laws</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "harassment" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Harassment Support</h3>
          <div className="space-y-3">
            {harassmentSupport.map((support) => (
              <Card key={support.id} className={`hover:shadow-md transition-shadow ${
                support.emergency ? 'border-red-200 bg-red-50' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      support.emergency ? 'bg-red-100' : 'bg-orange-100'
                    }`}>
                      <Shield className={`h-5 w-5 ${
                        support.emergency ? 'text-red-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{support.type}</h4>
                        {support.emergency && (
                          <Badge className="bg-red-100 text-red-800">Emergency</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{support.description}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Available Support:</p>
                    <div className="flex flex-wrap gap-1">
                      {support.support.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleReportHarassment(support)}
                    className={`w-full ${
                      support.emergency 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    {support.emergency ? '🚨 Report Emergency' : 'Report Incident'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-900">Confidential Support</p>
                  <p className="text-sm text-purple-700">
                    All reports are handled with complete confidentiality. We provide protection and support 
                    throughout the process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Document Assistance</h3>
          <div className="space-y-3">
            {documentServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{service.cost}</p>
                      <p className="text-xs text-gray-500">{service.processingTime}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Required Documents:</p>
                    <div className="flex flex-wrap gap-1">
                      {service.required.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRequestDocumentService(service)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Request Assistance
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Document Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-16 flex flex-col">
                  <Download className="h-6 w-6 mb-1" />
                  <span className="text-xs">Application Forms</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <FileText className="h-6 w-6 mb-1" />
                  <span className="text-xs">Checklists</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <BookOpen className="h-6 w-6 mb-1" />
                  <span className="text-xs">Guidelines</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <HelpCircle className="h-6 w-6 mb-1" />
                  <span className="text-xs">FAQs</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Free Document Assistance</p>
                  <p className="text-sm text-green-700">
                    All document processing services are provided free of cost for security personnel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}