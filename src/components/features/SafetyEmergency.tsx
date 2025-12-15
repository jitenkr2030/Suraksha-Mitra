"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VoiceCommands } from "@/components/features/VoiceCommands";
import { 
  Shield, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Clock,
  Cloud,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Navigation,
  Flashlight,
  Bell,
  Heart,
  Ambulance,
  Mic
} from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary: boolean;
}

interface SafetyAlert {
  id: string;
  type: "Weather" | "Security" | "Health" | "Traffic";
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  timestamp: string;
  location: string;
}

interface SafeZone {
  id: string;
  name: string;
  address: string;
  distance: string;
  type: string;
}

export function SafetyEmergency() {
  const [activeTab, setActiveTab] = useState("sos");
  const [sosCountdown, setSosCountdown] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("Mumbai, Maharashtra");

  const emergencyContacts: EmergencyContact[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      relation: "Spouse",
      phone: "+91 98765 43210",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Sunita Sharma",
      relation: "Sister",
      phone: "+91 87654 32109",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Security Office",
      relation: "Work",
      phone: "+91 76543 21098",
      isPrimary: false,
    },
  ];

  const safetyAlerts: SafetyAlert[] = [
    {
      id: "1",
      type: "Weather",
      title: "Heavy Rain Warning",
      description: "Heavy rainfall expected in next 2 hours. Avoid outdoor duty if possible.",
      severity: "High",
      timestamp: "30 min ago",
      location: "Mumbai",
    },
    {
      id: "2",
      type: "Security",
      title: "Suspicious Activity",
      description: "Report of suspicious individuals near Sector 15. Stay vigilant.",
      severity: "Medium",
      timestamp: "1 hour ago",
      location: "Navi Mumbai",
    },
    {
      id: "3",
      type: "Health",
      title: "Health Advisory",
      description: "Heat wave warning. Stay hydrated and avoid prolonged sun exposure.",
      severity: "Medium",
      timestamp: "2 hours ago",
      location: "Mumbai",
    },
  ];

  const safeZones: SafeZone[] = [
    {
      id: "1",
      name: "Police Station",
      address: "Sector 17, Vashi",
      distance: "0.8 km",
      type: "Police",
    },
    {
      id: "2",
      name: "City Hospital",
      address: "Sector 10, Vashi",
      distance: "1.2 km",
      type: "Hospital",
    },
    {
      id: "3",
      name: "Fire Station",
      address: "Sector 18, Vashi",
      distance: "1.5 km",
      type: "Fire",
    },
    {
      id: "4",
      name: "24/7 Pharmacy",
      address: "Sector 15, Vashi",
      distance: "0.5 km",
      type: "Medical",
    },
  ];

  const handleActivateSOS = () => {
    if (sosCountdown === 0) {
      setSosCountdown(5);
      const countdown = setInterval(() => {
        setSosCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            triggerSOS();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const triggerSOS = () => {
    alert("🚨 EMERGENCY SOS ACTIVATED! 🚨\n\nYour location has been sent to emergency services and your emergency contacts have been notified.\n\nHelp is on the way!");
  };

  const handleCancelSOS = () => {
    setSosCountdown(0);
  };

  const handleCallEmergency = (type: string) => {
    const numbers = {
      police: "100",
      ambulance: "108",
      fire: "101",
      women: "1091",
    };
    alert(`Calling ${type.toUpperCase()} at ${numbers[type as keyof typeof numbers]}...`);
  };

  const handleShareLocation = () => {
    alert(`Location shared: ${currentLocation}\n\nYour emergency contacts have been notified with your current location.`);
  };

  const handleAddContact = () => {
    alert("Add emergency contact feature coming soon!");
  };

  const tabs = [
    { id: "sos", label: "Emergency SOS", icon: Shield },
    { id: "contacts", label: "Emergency Contacts", icon: Users },
    { id: "alerts", label: "Safety Alerts", icon: AlertTriangle },
    { id: "safezones", label: "Safe Zones", icon: MapPin },
    { id: "voice", label: "Voice Commands", icon: Mic },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-600 text-white";
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "Weather": return Cloud;
      case "Security": return Shield;
      case "Health": return Heart;
      case "Traffic": return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Safety & Emergency</h1>
        <p className="text-gray-600">Your safety is our top priority</p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Navigation className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Current Location</p>
                <p className="text-sm text-blue-700">{currentLocation}</p>
              </div>
            </div>
            <Button
              onClick={handleShareLocation}
              variant="outline"
              size="sm"
            >
              Share Location
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-white text-red-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "sos" && (
        <div className="space-y-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Emergency SOS</h3>
                <p className="text-sm text-red-700 mb-4">
                  Press and hold to activate emergency alert. Your location will be shared with emergency services and contacts.
                </p>
              </div>
              
              {sosCountdown > 0 ? (
                <div className="space-y-4">
                  <div className="bg-red-100 rounded-lg p-4">
                    <p className="text-red-900 font-medium mb-2">SOS Activating in {sosCountdown}...</p>
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(5 - sosCountdown) * 20}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button
                    onClick={handleCancelSOS}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Cancel SOS
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleActivateSOS}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold"
                >
                  ACTIVATE EMERGENCY SOS
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleCallEmergency("police")}
              className="bg-blue-600 hover:bg-blue-700 h-16 flex flex-col"
            >
              <Shield className="h-6 w-6 mb-1" />
              <span className="text-xs">Police (100)</span>
            </Button>
            <Button
              onClick={() => handleCallEmergency("ambulance")}
              className="bg-green-600 hover:bg-green-700 h-16 flex flex-col"
            >
              <Ambulance className="h-6 w-6 mb-1" />
              <span className="text-xs">Ambulance (108)</span>
            </Button>
            <Button
              onClick={() => handleCallEmergency("fire")}
              className="bg-orange-600 hover:bg-orange-700 h-16 flex flex-col"
            >
              <AlertTriangle className="h-6 w-6 mb-1" />
              <span className="text-xs">Fire (101)</span>
            </Button>
            <Button
              onClick={() => handleCallEmergency("women")}
              className="bg-purple-600 hover:bg-purple-700 h-16 flex flex-col"
            >
              <Users className="h-6 w-6 mb-1" />
              <span className="text-xs">Women Helpline</span>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Safety Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 flex flex-col">
                <Flashlight className="h-4 w-4 mb-1" />
                <span className="text-xs">Flashlight</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col">
                <Bell className="h-4 w-4 mb-1" />
                <span className="text-xs">Panic Alarm</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col">
                <MapPin className="h-4 w-4 mb-1" />
                <span className="text-xs">Share Route</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col">
                <Phone className="h-4 w-4 mb-1" />
                <span className="text-xs">Check In</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Emergency Contacts</h3>
            <Button
              onClick={handleAddContact}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Add Contact
            </Button>
          </div>
          
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{contact.name}</h4>
                          {contact.isPrimary && (
                            <Badge className="bg-red-100 text-red-800">Primary</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{contact.relation}</p>
                        <p className="text-sm font-medium">{contact.phone}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => alert(`Calling ${contact.name}...`)}
                      variant="outline"
                      size="sm"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900">Auto-Notification</p>
                  <p className="text-sm text-green-700">
                    When you activate SOS, all your emergency contacts will be automatically notified with your location.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "alerts" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Safety Alerts</h3>
            <Badge variant="outline">{safetyAlerts.length} active</Badge>
          </div>
          
          <div className="space-y-3">
            {safetyAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <Card key={alert.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        alert.severity === "Critical" ? "bg-red-100" :
                        alert.severity === "High" ? "bg-orange-100" :
                        alert.severity === "Medium" ? "bg-yellow-100" : "bg-green-100"
                      }`}>
                        <AlertIcon className={`h-5 w-5 ${
                          alert.severity === "Critical" ? "text-red-600" :
                          alert.severity === "High" ? "text-orange-600" :
                          alert.severity === "Medium" ? "text-yellow-600" : "text-green-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{alert.timestamp}</span>
                          <span>{alert.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Alert Preferences</p>
                  <p className="text-sm text-blue-700">
                    Customize your alert settings in the app profile to receive notifications for your area.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "safezones" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Nearby Safe Zones</h3>
            <Badge variant="outline">{safeZones.length} locations</Badge>
          </div>
          
          <div className="space-y-3">
            {safeZones.map((zone) => (
              <Card key={zone.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{zone.name}</h4>
                        <p className="text-sm text-gray-600">{zone.address}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{zone.distance}</span>
                          <span>•</span>
                          <span>{zone.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => alert(`Getting directions to ${zone.name}...`)}
                      variant="outline"
                      size="sm"
                    >
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-900">Safety Reminder</p>
                  <p className="text-sm text-orange-700">
                    Always keep your phone charged and location services enabled. Your safety is our priority.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "voice" && (
        <VoiceCommands
          onSOS={handleActivateSOS}
          onCallEmergency={handleCallEmergency}
          onShareLocation={handleShareLocation}
        />
      )}
    </div>
  );
}