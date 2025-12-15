"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  IdCard, 
  Download, 
  Share2, 
  Camera, 
  Upload, 
  FileText,
  Shield,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  QrCode,
  User,
  MapPin,
  Calendar,
  Phone
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  verified: boolean;
  icon: any;
}

interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  certified: boolean;
}

export function DigitalId() {
  const [activeTab, setActiveTab] = useState("id");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const guardProfile = {
    name: "Rajesh Kumar",
    photo: "/api/placeholder/80/80",
    phone: "+91 98765 43210",
    city: "Mumbai",
    psaraLicense: "MH-SEC-2024-1234",
    experience: "5 years",
    joinDate: "2019-03-15",
    status: "Active",
    rating: 4.8,
    totalAssignments: 1240,
  };

  const skills: Skill[] = [
    { id: "1", name: "Fire Safety", level: "Advanced", certified: true },
    { id: "2", name: "First Aid", level: "Intermediate", certified: true },
    { id: "3", name: "CCTV Monitoring", level: "Intermediate", certified: false },
    { id: "4", name: "Crowd Control", level: "Advanced", certified: true },
    { id: "5", name: "Visitor Management", level: "Beginner", certified: false },
  ];

  const documents: Document[] = [
    {
      id: "1",
      name: "Aadhaar Card",
      type: "Identity Proof",
      uploadDate: "2024-01-15",
      size: "2.1 MB",
      verified: true,
      icon: IdCard,
    },
    {
      id: "2",
      name: "PAN Card",
      type: "Identity Proof",
      uploadDate: "2024-01-15",
      size: "1.8 MB",
      verified: true,
      icon: IdCard,
    },
    {
      id: "3",
      name: "PSARA License",
      type: "Certificate",
      uploadDate: "2024-01-20",
      size: "3.2 MB",
      verified: true,
      icon: Shield,
    },
    {
      id: "4",
      name: "Fire Safety Certificate",
      type: "Certificate",
      uploadDate: "2024-02-01",
      size: "1.5 MB",
      verified: true,
      icon: Award,
    },
    {
      id: "5",
      name: "Salary Slip - Jan 2024",
      type: "Financial",
      uploadDate: "2024-02-05",
      size: "890 KB",
      verified: false,
      icon: FileText,
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      alert(`File "${file.name}" selected for upload`);
    }
  };

  const handleDownloadId = () => {
    alert("Downloading Digital ID card...");
  };

  const handleShareId = () => {
    alert("Sharing Digital ID card...");
  };

  const handleDownloadDocument = (doc: Document) => {
    alert(`Downloading ${doc.name}...`);
  };

  const tabs = [
    { id: "id", label: "Digital ID", icon: IdCard },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "skills", label: "Skills", icon: Star },
  ];

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Digital ID & Documents</h1>
        <p className="text-gray-600">Your professional identity and secure document storage</p>
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
      {activeTab === "id" && (
        <div className="space-y-4">
          {/* Digital ID Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm font-medium">SURAKSHA MITRA</span>
                  </div>
                  <h2 className="text-xl font-bold">Digital Identity Card</h2>
                </div>
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-blue-100 text-xs">Name</p>
                  <p className="font-semibold">{guardProfile.name}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">License Number</p>
                  <p className="font-semibold">{guardProfile.psaraLicense}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">Phone</p>
                  <p className="font-semibold">{guardProfile.phone}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">City</p>
                  <p className="font-semibold">{guardProfile.city}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs">Status</p>
                  <Badge className="bg-green-500 text-white">Active</Badge>
                </div>
                <div className="bg-white p-2 rounded">
                  <QrCode className="h-8 w-8 text-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleDownloadId}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download ID
            </Button>
            <Button
              onClick={handleShareId}
              variant="outline"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share ID
            </Button>
          </div>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{guardProfile.experience}</p>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{guardProfile.totalAssignments}</p>
                  <p className="text-sm text-gray-600">Assignments</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium">{guardProfile.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{guardProfile.rating}/5.0</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-4">
          {/* Upload Document */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Label htmlFor="document-upload">Upload New Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedFile ? selectedFile.name : "Choose a file or drag and drop"}
                  </p>
                  <Input
                    id="document-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <Button
                    onClick={() => document.getElementById("document-upload")?.click()}
                    variant="outline"
                    size="sm"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Documents</h3>
              <Badge variant="outline">{documents.length} documents</Badge>
            </div>
            
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <doc.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      <Button
                        onClick={() => handleDownloadDocument(doc)}
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Storage Info */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-sm">Storage Used</p>
                    <p className="text-xs text-gray-500">9.5 MB of 100 MB</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">9.5%</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "9.5%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "skills" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Skills & Certifications</h3>
          
          <div className="space-y-3">
            {skills.map((skill) => (
              <Card key={skill.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <Star className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <Badge className={getSkillLevelColor(skill.level)}>
                          {skill.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {skill.certified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      ) : (
                        <Badge variant="outline">Not Certified</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        View Certificate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Skill */}
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Add New Skill</p>
              <p className="text-sm text-gray-500 mb-3">
                Complete training courses to add new skills to your profile
              </p>
              <Button variant="outline" size="sm">
                Browse Courses
              </Button>
            </CardContent>
          </Card>

          {/* Skill Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skill Development Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Skill Coverage</span>
                    <span className="text-blue-600">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-xs text-gray-600">Certified Skills</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">2</p>
                    <p className="text-xs text-gray-600">In Progress</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Verification Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Verification Status</p>
              <p className="text-sm text-blue-700">
                Your Digital ID is verified and authenticated. All documents are securely stored with end-to-end encryption.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}