"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { LandingPage } from "@/components/LandingPage";
import { HealthWellness } from "@/components/features/HealthWellness";
import { FinancialBenefits } from "@/components/features/FinancialBenefits";
import { TrainingDevelopment } from "@/components/features/TrainingDevelopment";
import { CommunityFeatures } from "@/components/features/CommunityFeatures";
import { DigitalId } from "@/components/features/DigitalId";
import { SafetyEmergency } from "@/components/features/SafetyEmergency";
import { DailyUtilities } from "@/components/features/DailyUtilities";
import { OfflineMode } from "@/components/features/OfflineMode";
import { LanguageSelector } from "@/components/features/LanguageSelector";
import { GPSTracking } from "@/components/features/GPSTracking";
import { SubscriptionFeatures } from "@/components/features/SubscriptionFeatures";
import { AIChatbot } from "@/components/features/AIChatbot";
import { AdvancedAnalytics } from "@/components/features/AdvancedAnalytics";
import { FamilyWelfareServices } from "@/components/features/FamilyWelfareServices";
import { LegalRightsSupport } from "@/components/features/LegalRightsSupport";
import { UPIManagement } from "@/components/featuresUPIManagement";
import { UPIBenefits } from "@/components/featuresUPIBenefits";
import { 
  Home, 
  Heart, 
  DollarSign, 
  BookOpen, 
  Users, 
  IdCard, 
  Calculator, 
  Shield,
  Award,
  LogOut,
  Wifi,
  WifiOff,
  Globe,
  MapPin,
  Crown,
  MessageSquare,
  BarChart3,
  Brain,
  Users as FamilyIcon,
  Scale as LegalIcon
} from "lucide-react";

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("home");
  const [showDigitalId, setShowDigitalId] = useState(false);
  const [showDailyUtilities, setShowDailyUtilities] = useState(false);
  const [showSafetyEmergency, setShowSafetyEmergency] = useState(false);
  const [showOfflineMode, setShowOfflineMode] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showGPSTracking, setShowGPSTracking] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);
  const [showFamilyWelfare, setShowFamilyWelfare] = useState(false);
  const [showLegalSupport, setShowLegalSupport] = useState(false);
  const [showUPIManagement, setShowUPIManagement] = useState(false);
  const [showAuthForms, setShowAuthForms] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "health", label: "Health", icon: Heart },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "family", label: "Family", icon: FamilyIcon },
    { id: "legal", label: "Legal", icon: LegalIcon },
    { id: "training", label: "Training", icon: BookOpen },
    { id: "community", label: "Community", icon: Users },
  ];

  const quickActions = [
    { title: "Emergency SOS", icon: Shield, color: "bg-red-500", action: "sos" },
    { title: "Digital ID", icon: IdCard, color: "bg-blue-500", action: "id" },
    { title: "Family Welfare", icon: FamilyIcon, color: "bg-purple-500", action: "family" },
    { title: "Legal Support", icon: LegalIcon, color: "bg-indigo-500", action: "legal" },
    { title: "AI Assistant", icon: MessageSquare, color: "bg-purple-500", action: "ai" },
    { title: "UPI Settings", icon: DollarSign, color: "bg-green-500", action: "upi" },
  ];

  const benefits = [
    { title: "Free Doctor Consult", description: "24/7 teleconsultation with doctors", icon: "👨‍⚕️" },
    { title: "Family Education Support", description: "Scholarships for children's education", icon: "🎓" },
    { title: "Legal Aid Services", description: "Free legal consultation and support", icon: "⚖️" },
    { title: "Accident Insurance", description: "Starting from ₹50/month", icon: "🛡️" },
    { title: "Emergency Loans", description: "₹2,000-₹10,000 available", icon: "💰" },
    { title: "Training Courses", description: "Get certified and grow", icon: "📚" },
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "sos":
        setShowSafetyEmergency(true);
        break;
      case "id":
        setShowDigitalId(true);
        break;
      case "family":
        setShowFamilyWelfare(true);
        break;
      case "legal":
        setShowLegalSupport(true);
        break;
      case "ai":
        setShowAIChatbot(true);
        break;
      case "analytics":
        setShowAdvancedAnalytics(true);
        break;
      case "upi":
        setShowUPIManagement(true);
        break;
      default:
        console.log(action);
    }
  };

  const handleSOS = () => {
    alert("Emergency SOS activated! Help is on the way.");
  };

  if (!isAuthenticated) {
    if (showAuthForms) {
      return <AuthWrapper />;
    }
    return (
      <LandingPage 
        onShowLogin={() => setShowAuthForms(true)}
        onShowRegister={() => setShowAuthForms(true)}
      />
    );
  }

  if (showDigitalId) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Digital ID</h1>
            <p className="text-sm text-gray-600">Your professional identity</p>
          </div>
          <Button 
            onClick={() => setShowDigitalId(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <DigitalId />
        </main>
      </div>
    );
  }

  if (showDailyUtilities) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Daily Utilities</h1>
            <p className="text-sm text-gray-600">Duty tracker & salary calculator</p>
          </div>
          <Button 
            onClick={() => setShowDailyUtilities(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <DailyUtilities />
        </main>
      </div>
    );
  }

  if (showSafetyEmergency) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Safety & Emergency</h1>
            <p className="text-sm text-gray-600">Your safety is our priority</p>
          </div>
          <Button 
            onClick={() => setShowSafetyEmergency(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <SafetyEmergency />
        </main>
      </div>
    );
  }

  if (showOfflineMode) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Offline Mode</h1>
            <p className="text-sm text-gray-600">Access features without internet</p>
          </div>
          <Button 
            onClick={() => setShowOfflineMode(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <OfflineMode />
        </main>
      </div>
    );
  }

  if (showLanguageSelector) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Language Settings</h1>
            <p className="text-sm text-gray-600">Choose your preferred language</p>
          </div>
          <Button 
            onClick={() => setShowLanguageSelector(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={setLanguage}
            onBack={() => setShowLanguageSelector(false)}
          />
        </main>
      </div>
    );
  }

  if (showGPSTracking) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">GPS Tracking</h1>
            <p className="text-sm text-gray-600">Real-time location sharing</p>
          </div>
          <Button 
            onClick={() => setShowGPSTracking(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <GPSTracking />
        </main>
      </div>
    );
  }

  if (showSubscription) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Subscription Plans</h1>
            <p className="text-sm text-gray-600">Choose your plan</p>
          </div>
          <Button 
            onClick={() => setShowSubscription(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <SubscriptionFeatures />
        </main>
      </div>
    );
  }

  if (showAIChatbot) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-sm text-gray-600">24/7 Virtual Support</p>
          </div>
          <Button 
            onClick={() => setShowAIChatbot(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <AIChatbot />
        </main>
      </div>
    );
  }

  if (showAdvancedAnalytics) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Advanced Analytics</h1>
            <p className="text-sm text-gray-600">Predictive Insights for Health & Career</p>
          </div>
          <Button 
            onClick={() => setShowAdvancedAnalytics(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <AdvancedAnalytics />
        </main>
      </div>
    );
  }

  if (showFamilyWelfare) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Family Welfare Services</h1>
            <p className="text-sm text-gray-600">Support for your family's well-being</p>
          </div>
          <Button 
            onClick={() => setShowFamilyWelfare(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <FamilyWelfareServices />
        </main>
      </div>
    );
  }

  if (showLegalSupport) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Legal & Rights Support</h1>
            <p className="text-sm text-gray-600">Protecting your rights and ensuring justice</p>
          </div>
          <Button 
            onClick={() => setShowLegalSupport(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <LegalRightsSupport />
        </main>
      </div>
    );
  }

  if (showUPIManagement) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">UPI Payment Settings</h1>
            <p className="text-sm text-gray-600">Manage your payment information</p>
          </div>
          <Button 
            onClick={() => setShowUPIManagement(false)}
            variant="outline"
            size="sm"
          >
            ← Back
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 pb-20">
          <UPIManagement />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Suraksha Mitra</h1>
          <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={() => setShowLanguageSelector(true)}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => setShowSafetyEmergency(true)}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
          >
            <Shield className="h-5 w-5" />
          </Button>
          <Button 
            onClick={logout}
            variant="outline"
            size="sm"
            className="p-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-20">
        {activeTab === "home" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h2>
              <p className="text-gray-600">Your welfare and growth is our priority</p>
              {user?.isVerified && (
                <Badge className="mt-2 bg-green-100 text-green-800">Verified Guard</Badge>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium">{action.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Your Benefits</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center space-x-3">
                      <div className="text-2xl">{benefit.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">UPI Payment Benefits</h3>
              <UPIBenefits />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Today's Summary</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">8</p>
                      <p className="text-sm text-gray-600">Duty Hours</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">₹1,200</p>
                      <p className="text-sm text-gray-600">Today's Earnings</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-lg font-semibold text-orange-600">2</p>
                      <p className="text-xs text-gray-600">Overtime Hrs</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-lg font-semibold text-purple-600">15</p>
                      <p className="text-xs text-gray-600">Days Present</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-lg font-semibold text-red-600">1</p>
                      <p className="text-xs text-gray-600">Leave Left</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Quick Access</h3>
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-3">
                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Heart className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xs">Health</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-xs">Finance</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-xs">Training</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="text-xs">Community</p>
                </div>
                <div className="text-center">
                  <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">
                    <MessageSquare className="h-6 w-6 text-indigo-600" />
                  </div>
                  <p className="text-xs">AI Assistant</p>
                </div>
                <div className="text-center">
                  <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1">
                    <BarChart3 className="h-6 w-6 text-pink-600" />
                  </div>
                  <p className="text-xs">Analytics</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Training Progress</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fire Safety</span>
                        <span className="text-green-600">Completed</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>First Aid</span>
                        <span className="text-blue-600">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CCTV Handling</span>
                        <span className="text-orange-600">30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full w-[30%]"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-2">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed Fire Safety Training</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Salary credited for this month</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === "health" && <HealthWellness />}
        {activeTab === "finance" && <FinancialBenefits />}
        {activeTab === "family" && <FamilyWelfareServices />}
        {activeTab === "legal" && <LegalRightsSupport />}
        {activeTab === "training" && <TrainingDevelopment />}
        {activeTab === "community" && <CommunityFeatures />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 min-w-[60px] ${
                activeTab === item.id ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function SecurityGuardWelfareApp() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}