"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Video, 
  Shield, 
  Pill, 
  Activity, 
  Heart, 
  Clock,
  MapPin,
  Star,
  CheckCircle
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  available: boolean;
  consultationFee: number;
}

interface InsurancePlan {
  id: string;
  name: string;
  coverage: string;
  premium: number;
  features: string[];
}

export function HealthWellness() {
  const [activeTab, setActiveTab] = useState("consultation");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Rajesh Sharma",
      specialty: "General Physician",
      rating: 4.8,
      experience: 15,
      available: true,
      consultationFee: 0,
    },
    {
      id: "2",
      name: "Dr. Priya Patel",
      specialty: "Orthopedic",
      rating: 4.9,
      experience: 12,
      available: true,
      consultationFee: 0,
    },
    {
      id: "3",
      name: "Dr. Amit Kumar",
      specialty: "Cardiologist",
      rating: 4.7,
      experience: 20,
      available: false,
      consultationFee: 0,
    },
  ];

  const insurancePlans: InsurancePlan[] = [
    {
      id: "1",
      name: "Basic Accident Insurance",
      coverage: "₹1,00,000",
      premium: 50,
      features: ["Accident coverage", "Emergency hospitalization", "24/7 support"],
    },
    {
      id: "2",
      name: "Standard Health Insurance",
      coverage: "₹5,00,000",
      premium: 150,
      features: ["Full health coverage", "Pre-existing conditions", "Cashless treatment"],
    },
    {
      id: "3",
      name: "Premium Health Insurance",
      coverage: "₹10,00,000",
      premium: 300,
      features: ["Complete coverage", "International treatment", "No co-payment"],
    },
  ];

  const handleBookConsultation = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    alert(`Booking consultation with ${doctor.name}. You will receive a call shortly.`);
  };

  const handleBuyInsurance = (plan: InsurancePlan) => {
    alert(`Insurance plan "${plan.name}" purchase initiated. Our team will contact you soon.`);
  };

  const tabs = [
    { id: "consultation", label: "Doctor Consult", icon: Video },
    { id: "insurance", label: "Insurance", icon: Shield },
    { id: "medicines", label: "Medicines", icon: Pill },
    { id: "labs", label: "Lab Tests", icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Health & Wellness</h1>
        <p className="text-gray-600">Your health is our priority</p>
      </div>

      {/* Emergency SOS */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900">Emergency SOS</h3>
                <p className="text-sm text-red-700">24/7 Emergency Helpline</p>
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
      {activeTab === "consultation" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Doctors</h3>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <Badge variant={doctor.available ? "default" : "secondary"}>
                          {doctor.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{doctor.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.experience} years exp.</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">FREE</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleBookConsultation(doctor)}
                      disabled={!doctor.available}
                      className="ml-4"
                    >
                      {doctor.available ? "Book Now" : "Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "insurance" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Insurance Plans</h3>
          <div className="space-y-3">
            {insurancePlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{plan.name}</h4>
                      <p className="text-sm text-gray-600">Coverage: {plan.coverage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">₹{plan.premium}</p>
                      <p className="text-sm text-gray-500">/month</p>
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
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "medicines" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medication Reminders</h3>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="medicine">Medicine Name</Label>
                  <Input id="medicine" placeholder="Enter medicine name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input id="dosage" placeholder="e.g., 1 tablet" />
                  </div>
                  <div>
                    <Label htmlFor="timing">Timing</Label>
                    <Input id="timing" type="time" />
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Active Reminders</h4>
            <div className="space-y-2">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Paracetamol</p>
                      <p className="text-sm text-gray-600">1 tablet - After breakfast</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "labs" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Lab Test Discounts</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">Blood Test</h4>
                <p className="text-xs text-gray-600">30% off</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">X-Ray</h4>
                <p className="text-xs text-gray-600">25% off</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">ECG</h4>
                <p className="text-xs text-gray-600">40% off</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">Health Checkup</h4>
                <p className="text-xs text-gray-600">50% off</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Nearby Labs</p>
                  <p className="text-sm text-gray-600">3 partner labs within 2km</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}