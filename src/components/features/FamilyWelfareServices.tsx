"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  GraduationCap, 
  School, 
  Heart, 
  Baby, 
  Users, 
  Heart as Ring,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  MapPin,
  Phone,
  Calendar,
  Award,
  Shield,
  Stethoscope,
  BookOpen,
  UserPlus
} from "lucide-react";

interface Scholarship {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  amount: string;
  deadline: string;
  status: "available" | "applied" | "closed";
}

interface School {
  id: string;
  name: string;
  type: string;
  distance: string;
  rating: number;
  facilities: string[];
  contact: string;
}

interface InsurancePlan {
  id: string;
  name: string;
  coverage: string;
  premium: string;
  familyMembers: string;
  features: string[];
}

interface ChildcareService {
  id: string;
  name: string;
  type: string;
  ageGroup: string;
  timing: string;
  fees: string;
  distance: string;
}

interface ElderlyCareService {
  id: string;
  name: string;
  service: string;
  features: string[];
  cost: string;
  rating: number;
}

export function FamilyWelfareServices() {
  const [activeTab, setActiveTab] = useState("education");
  const [scholarshipForm, setScholarshipForm] = useState({
    childName: "",
    schoolName: "",
    grade: "",
    annualIncome: ""
  });

  const scholarships: Scholarship[] = [
    {
      id: "1",
      name: "Guardian's Pride Scholarship",
      description: "Merit-based scholarship for children of security personnel",
      eligibility: "Grade A+ students, Income < ₹5L/year",
      amount: "₹25,000/year",
      deadline: "2024-03-31",
      status: "available"
    },
    {
      id: "2",
      name: "Suraksha Education Fund",
      description: "Financial assistance for higher education",
      eligibility: "12th pass, pursuing graduation",
      amount: "₹50,000/year",
      deadline: "2024-04-15",
      status: "available"
    },
    {
      id: "3",
      name: "Technical Education Support",
      description: "Support for engineering and technical courses",
      eligibility: "JEE/NEET qualified",
      amount: "₹1,00,000/year",
      deadline: "2024-05-30",
      status: "available"
    }
  ];

  const schools: School[] = [
    {
      id: "1",
      name: "Delhi Public School",
      type: "CBSE",
      distance: "2.5 km",
      rating: 4.5,
      facilities: ["Sports", "Library", "Lab", "Transport"],
      contact: "+91 98765 43210"
    },
    {
      id: "2",
      name: "Kendriya Vidyalaya",
      type: "CBSE",
      distance: "1.8 km",
      rating: 4.2,
      facilities: ["Sports", "Library", "Medical"],
      contact: "+91 87654 32109"
    },
    {
      id: "3",
      name: "St. Mary's Convent",
      type: "ICSE",
      distance: "3.2 km",
      rating: 4.7,
      facilities: ["Sports", "Library", "Lab", "Music"],
      contact: "+91 76543 21098"
    }
  ];

  const insurancePlans: InsurancePlan[] = [
    {
      id: "1",
      name: "Basic Family Cover",
      coverage: "₹5,00,000",
      premium: "₹3,500/year",
      familyMembers: "Self + Spouse + 2 Children",
      features: ["Hospitalization", "Accident Cover", "Maternity"]
    },
    {
      id: "2",
      name: "Comprehensive Family Plan",
      coverage: "₹10,00,000",
      premium: "₹6,000/year",
      familyMembers: "Self + Spouse + 3 Children + Parents",
      features: ["Full Coverage", "Pre-existing", "Dental", "Vision"]
    },
    {
      id: "3",
      name: "Premium Family Health",
      coverage: "₹25,00,000",
      premium: "₹12,000/year",
      familyMembers: "Full Family",
      features: ["Complete Coverage", "International", "No Limits", "Cashless"]
    }
  ];

  const childcareServices: ChildcareService[] = [
    {
      id: "1",
      name: "Little Angels Daycare",
      type: "Daycare",
      ageGroup: "6 months - 6 years",
      timing: "8:00 AM - 6:00 PM",
      fees: "₹3,000/month",
      distance: "1.2 km"
    },
    {
      id: "2",
      name: "After School Club",
      type: "After-school",
      ageGroup: "6 - 12 years",
      timing: "2:00 PM - 6:00 PM",
      fees: "₹1,500/month",
      distance: "0.8 km"
    },
    {
      id: "3",
      name: "Kids Learning Center",
      type: "Full-time",
      ageGroup: "2 - 8 years",
      timing: "9:00 AM - 5:00 PM",
      fees: "₹4,500/month",
      distance: "2.0 km"
    }
  ];

  const elderlyCareServices: ElderlyCareService[] = [
    {
      id: "1",
      name: "Senior Care Home",
      service: "Full-time Care",
      features: ["24/7 Medical Care", "Physiotherapy", "Recreation"],
      cost: "₹15,000/month",
      rating: 4.6
    },
    {
      id: "2",
      name: "Home Care Services",
      service: "Home Visit",
      features: ["Nursing Care", "Medication", "Companionship"],
      cost: "₹800/visit",
      rating: 4.4
    },
    {
      id: "3",
      name: "Elderly Day Care",
      service: "Day Care",
      features: ["Activities", "Meals", "Medical Checkup"],
      cost: "₹2,500/month",
      rating: 4.3
    }
  ];

  const handleApplyScholarship = (scholarship: Scholarship) => {
    alert(`Scholarship application for "${scholarship.name}" initiated. Our team will contact you for document verification.`);
  };

  const handleContactSchool = (school: School) => {
    alert(`Contacting ${school.name} at ${school.contact} for admission assistance.`);
  };

  const handleBuyInsurance = (plan: InsurancePlan) => {
    alert(`Insurance plan "${plan.name}" purchase initiated. Our team will contact you soon.`);
  };

  const handleBookChildcare = (service: ChildcareService) => {
    alert(`Booking inquiry sent to ${service.name}. They will contact you shortly.`);
  };

  const handleContactElderlyCare = (service: ElderlyCareService) => {
    alert(`Contacting ${service.name} for elderly care services.`);
  };

  const handleMarriageAssistance = () => {
    alert("Marriage assistance request received. Our financial advisor will contact you within 24 hours.");
  };

  const tabs = [
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "school", label: "School Admission", icon: School },
    { id: "insurance", label: "Family Health", icon: Heart },
    { id: "childcare", label: "Childcare", icon: Baby },
    { id: "elderly", label: "Elderly Care", icon: Users },
    { id: "marriage", label: "Marriage", icon: Ring },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Family Welfare Services</h1>
        <p className="text-gray-600">Comprehensive support for your family's well-being</p>
      </div>

      {/* Family Summary Card */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-100 text-sm">Family Members Covered</p>
              <p className="text-3xl font-bold">5 Members</p>
            </div>
            <Users className="h-12 w-12 text-purple-200" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-purple-100 text-xs">Children</p>
              <p className="text-lg font-semibold">2</p>
            </div>
            <div>
              <p className="text-purple-100 text-xs">Adults</p>
              <p className="text-lg font-semibold">2</p>
            </div>
            <div>
              <p className="text-purple-100 text-xs">Elderly</p>
              <p className="text-lg font-semibold">1</p>
            </div>
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
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "education" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Scholarships</h3>
          <div className="space-y-3">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{scholarship.name}</h4>
                        <Badge variant={scholarship.status === "available" ? "default" : "secondary"}>
                          {scholarship.status === "available" ? "Apply Now" : scholarship.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{scholarship.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Deadline: {scholarship.deadline}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Eligibility: {scholarship.eligibility}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleApplyScholarship(scholarship)}
                    disabled={scholarship.status !== "available"}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {scholarship.status === "available" ? "Apply Now" : "Applied"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Quick Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="childName">Child's Name</Label>
                <Input 
                  id="childName" 
                  placeholder="Enter child's name"
                  value={scholarshipForm.childName}
                  onChange={(e) => setScholarshipForm({...scholarshipForm, childName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="schoolName">School/College Name</Label>
                <Input 
                  id="schoolName" 
                  placeholder="Current institution"
                  value={scholarshipForm.schoolName}
                  onChange={(e) => setScholarshipForm({...scholarshipForm, schoolName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grade">Grade/Class</Label>
                  <Input 
                    id="grade" 
                    placeholder="e.g., 10th, B.Sc."
                    value={scholarshipForm.grade}
                    onChange={(e) => setScholarshipForm({...scholarshipForm, grade: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="annualIncome">Annual Family Income</Label>
                  <Input 
                    id="annualIncome" 
                    placeholder="₹"
                    value={scholarshipForm.annualIncome}
                    onChange={(e) => setScholarshipForm({...scholarshipForm, annualIncome: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "school" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Nearby Schools</h3>
          <div className="space-y-3">
            {schools.map((school) => (
              <Card key={school.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{school.name}</h4>
                        <Badge variant="outline">{school.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{school.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{school.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{school.contact}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {school.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleContactSchool(school)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Contact for Admission
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Admission Assistance</p>
                  <p className="text-sm text-green-700">
                    We provide complete support for school admission including document preparation, 
                    form filling, and follow-up with schools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "insurance" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Family Health Insurance Plans</h3>
          <div className="space-y-3">
            {insurancePlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{plan.name}</h4>
                      <p className="text-sm text-gray-600">Coverage: {plan.coverage}</p>
                      <p className="text-sm text-gray-600">Family Members: {plan.familyMembers}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{plan.premium}</p>
                      <p className="text-sm text-gray-500">per year</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleBuyInsurance(plan)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Stethoscope className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Health Checkup Camps</p>
                  <p className="text-sm text-blue-700">
                    Free health checkup camps organized monthly for families of security personnel.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "childcare" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Childcare Services</h3>
          <div className="space-y-3">
            {childcareServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{service.name}</h4>
                        <Badge variant="outline">{service.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{service.ageGroup}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{service.timing}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{service.distance}</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-green-600">{service.fees}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBookChildcare(service)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Childcare Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Subsidized Rates</p>
                  <p className="text-xs text-gray-600">Special discounts for security personnel families</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Flexible Timing</p>
                  <p className="text-xs text-gray-600">Aligned with security duty schedules</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Safe Environment</p>
                  <p className="text-xs text-gray-600">Verified and trusted childcare providers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "elderly" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Elderly Care Services</h3>
          <div className="space-y-3">
            {elderlyCareServices.map((service) => (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{service.name}</h4>
                        <Badge variant="outline">{service.service}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{service.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{service.cost}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleContactElderlyCare(service)}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Contact Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">Medical Coordination</p>
                  <p className="text-sm text-orange-700">
                    We help coordinate medical care, hospital visits, and medication management for elderly parents.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "marriage" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Marriage Assistance</h3>
          
          <Card className="border-pink-200 bg-pink-50">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ring className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-pink-900 mb-2">Marriage Financial Support</h4>
                <p className="text-sm text-pink-700">
                  Financial assistance and planning support for family weddings
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">₹50,000</p>
                  <p className="text-sm text-gray-600">Maximum Support</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">0%</p>
                  <p className="text-sm text-gray-600">Interest Rate</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Financial Planning</p>
                    <p className="text-xs text-gray-600">Budget planning and expense management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Vendor Coordination</p>
                    <p className="text-xs text-gray-600">Help with venue, catering, and decorations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Documentation Support</p>
                    <p className="text-xs text-gray-600">Assistance with marriage registration</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleMarriageAssistance}
                className="w-full bg-pink-600 hover:bg-pink-700"
              >
                Apply for Marriage Assistance
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start space-x-3">
                <UserPlus className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Active Security Personnel</p>
                  <p className="text-xs text-gray-600">Must be currently employed as security guard</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Income Limit</p>
                  <p className="text-xs text-gray-600">Annual family income less than ₹6 lakhs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Service Period</p>
                  <p className="text-xs text-gray-600">Minimum 2 years of service</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}