"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Clock, 
  ThumbsUp, 
  ThumbsDown,
  AlertTriangle,
  Heart,
  Briefcase,
  BookOpen,
  Shield,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  XCircle
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: 'emergency' | 'health' | 'career' | 'general' | 'finance';
  quickActions?: string[];
}

interface ChatSession {
  id: string;
  messages: ChatMessage[];
  startTime: Date;
  isActive: boolean;
}

const QUICK_RESPONSES = [
  { text: "Emergency SOS", category: "emergency", icon: Shield },
  { text: "Health Consultation", category: "health", icon: Heart },
  { text: "Career Advice", category: "career", icon: Briefcase },
  { text: "Training Info", category: "career", icon: BookOpen },
  { text: "Financial Help", category: "finance", icon: DollarSign },
  { text: "Safety Tips", category: "general", icon: Shield },
];

const AI_PERSONAS = {
  emergency: {
    name: "Emergency Assistant",
    description: "Calm and authoritative for crisis situations",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  health: {
    name: "Health Advisor",
    description: "Compassionate and knowledgeable health guidance",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  career: {
    name: "Career Coach",
    description: "Professional development and training guidance",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  finance: {
    name: "Financial Advisor",
    description: "Practical money management and benefits advice",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  general: {
    name: "Virtual Assistant",
    description: "General help and information",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
};

export function AIChatbot() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'session-1',
      messages: [
        {
          id: 'welcome',
          type: 'bot',
          content: "👋 Namaste! I'm your Suraksha Mitra AI Assistant. I'm here to help you 24/7 with:\n\n🚨 **Emergency Support** - Quick SOS guidance and safety protocols\n🏥 **Health & Wellness** - Medical advice and wellness tips\n💼 **Career Growth** - Training guidance and job opportunities\n💰 **Financial Help** - Benefits, loans, and money management\n\nHow can I assist you today?",
          timestamp: new Date(),
          category: 'general',
          quickActions: ["Emergency SOS", "Health Consultation", "Career Advice", "Financial Help"]
        }
      ],
      startTime: new Date(),
      isActive: true
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentPersona, setCurrentPersona] = useState(AI_PERSONAS.general);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(session => session.isActive);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages]);

  const detectCategory = (message: string): 'emergency' | 'health' | 'career' | 'finance' | 'general' => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('sos') || lowerMessage.includes('help') || lowerMessage.includes('danger')) {
      return 'emergency';
    }
    if (lowerMessage.includes('health') || lowerMessage.includes('doctor') || lowerMessage.includes('medical') || lowerMessage.includes('sick')) {
      return 'health';
    }
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('training') || lowerMessage.includes('certificate')) {
      return 'career';
    }
    if (lowerMessage.includes('money') || lowerMessage.includes('salary') || lowerMessage.includes('loan') || lowerMessage.includes('insurance')) {
      return 'finance';
    }
    return 'general';
  };

  const generateAIResponse = async (userMessage: string, category: string): Promise<string> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Emergency responses
    if (category === 'emergency') {
      if (lowerMessage.includes('sos') || lowerMessage.includes('emergency')) {
        return `🚨 **EMERGENCY PROTOCOL ACTIVATED**\n\nStay calm! I'm here to guide you:\n\n1️⃣ **Immediate Actions:**\n   • Ensure your personal safety first\n   • Call emergency services: 100 (Police), 108 (Ambulance), 101 (Fire)\n   • Activate your SOS in the app if in immediate danger\n\n2️⃣ **Location Sharing:**\n   • Your GPS location is being tracked\n   • Emergency contacts will be notified\n   • Nearby safe zones: Police stations, hospitals\n\n3️⃣ **Stay Connected:**\n   • Keep your phone charged\n   • Follow my instructions carefully\n   • Help is on the way!\n\nAre you in immediate danger right now?`;
      }
      return `🛡️ **Safety Guidance**\n\nI understand you're concerned about safety. Here's what I recommend:\n\n• **Trust your instincts** - If something feels wrong, it probably is\n• **Know your exits** - Always be aware of escape routes\n• **Stay visible** - Work in well-lit areas when possible\n• **Regular check-ins** - Use the app's location sharing with family\n• **Emergency contacts** - Keep your emergency list updated\n\nWould you like me to help you set up your emergency contacts?`;
    }

    // Health responses
    if (category === 'health') {
      if (lowerMessage.includes('doctor') || lowerMessage.includes('consultation')) {
        return `🏥 **24/7 Health Consultation**\n\nI can connect you with a doctor immediately! Here's how:\n\n**Available Services:**\n• General physician consultation\n• Specialist referrals\n• Mental health counseling\n• Prescription advice\n• Health check-up scheduling\n\n**Next Steps:**\n1. Click "Start Video Call" in the Health section\n2. Choose your preferred doctor\n3. Consultation starts within 2 minutes\n\n**Cost:** Free for premium members\n\nWould you like me to guide you to the health consultation feature?`;
      }
      return `💚 **Health & Wellness Tips**\n\nAs a security guard, your health is crucial! Here are some key tips:\n\n**Physical Health:**\n• Stay hydrated during long shifts\n• Take regular breaks to stretch and walk\n• Maintain good posture while standing\n• Get 7-8 hours of sleep between shifts\n\n**Mental Health:**\n• Practice deep breathing during stressful moments\n• Connect with fellow guards for support\n• Use the meditation features in the app\n• Don't hesitate to seek counseling\n\n**Preventive Care:**\n• Regular health check-ups\n• Vaccinations up to date\n• Safety equipment always in good condition\n\nWould you like specific advice for any health concern?`;
    }

    // Career responses
    if (category === 'career') {
      if (lowerMessage.includes('training') || lowerMessage.includes('certificate')) {
        return `📚 **Training & Certification Guidance**\n\nGreat choice! Investing in your skills is the best career move. Here's what's available:\n\n**Popular Courses:**\n• Fire Safety Certification (₹500)\n• First Aid & CPR (₹750)\n• CCTV Operation (₹600)\n• Crowd Control Management (₹400)\n• Advanced Security Protocols (₹800)\n\n**Career Progression Path:**\n1. **Entry Level:** Basic Security Guard\n2. **Senior:** Team Leader (6 months experience)\n3. **Supervisor:** (1+ years, certifications)\n4. **Manager:** (2+ years, advanced training)\n\n**Benefits of Certification:**\n• 20-30% salary increase\n• Better job opportunities\n• Increased responsibility\n• Professional recognition\n\nWhich area interests you most? I can provide detailed course information!`;
      }
      return `💼 **Career Development Advice**\n\nLet's build your security career! Here's my guidance:\n\n**Skill Development:**\n• Technical skills: Surveillance, emergency response, report writing\n• Soft skills: Communication, conflict resolution, customer service\n• Physical fitness: Regular exercise and self-defense training\n\n**Networking:**\n• Join security guard forums in the app\n• Attend industry workshops and seminars\n• Connect with experienced professionals\n• Participate in community events\n\n**Job Opportunities:**\n• Check the job board regularly\n• Set up job alerts for your preferred locations\n• Apply for government security positions (better benefits)\n• Consider specialized security (events, corporate, residential)\n\n**Resume Building:**\n• Highlight certifications and training\n• Include specific achievements and responsibilities\n• Get recommendations from supervisors\n• Keep your digital profile updated\n\nWhat specific career goal would you like to work on?`;
    }

    // Finance responses
    if (category === 'finance') {
      if (lowerMessage.includes('loan') || lowerMessage.includes('emergency money')) {
        return `💰 **Emergency Loan Assistance**\n\nI understand you need financial help. Here's what's available:\n\n**Emergency Loan Options:**\n• **Quick Loan:** ₹2,000 - ₹5,000 (24-hour approval)\n• **Standard Loan:** ₹5,000 - ₹10,000 (48-hour approval)\n• **Premium Loan:** Up to ₹15,000 (premium members only)\n\n**Requirements:**\n• Active membership for 3+ months\n• Valid ID verification\n• No previous loan defaults\n• Basic income verification\n\n**Interest Rates:**\n• Quick Loan: 5% flat fee\n• Standard Loan: 3% monthly interest\n• Premium Loan: 2% monthly interest\n\n**Repayment Terms:**\n• Flexible 1-6 month repayment\n• Automatic salary deduction available\n• No early repayment penalties\n\n**Application Process:**\n1. Go to Financial Services section\n2. Select "Emergency Loans"\n3. Fill out the simple application\n4. Get instant decision\n\nWould you like me to guide you through the loan application?`;
      }
      return `💵 **Financial Planning & Benefits**\n\nLet's optimize your finances! Here's my advice:\n\n**Income Management:**\n• Track your salary and overtime with the app's calculator\n• Set up automatic savings (aim for 20% of income)\n• Create separate accounts for different goals\n\n**Available Benefits:**\n• **Insurance:** Accident coverage from ₹50/month\n• **Health Insurance:** Family coverage from ₹200/month\n• **Retirement Fund:** Optional contribution matching\n• **Emergency Fund:** Company-matched savings program\n\n**Money-Saving Tips:**\n• Use company transportation when available\n• Pack meals instead of buying food\n• Share accommodation with colleagues\n• Take advantage of free training programs\n\n**Debt Management:**\n• Prioritize high-interest debt first\n• Avoid payday loans (use our emergency loans instead)\n• Build an emergency fund (3-6 months expenses)\n\n**Investment Basics:**\n• Start with government savings schemes\n• Consider fixed deposits for short-term goals\n• Learn about mutual funds for long-term growth\n\nWhat specific financial area would you like to focus on?`;
    }

    // General responses
    return `🤖 **General Assistance**\n\nI'm here to help with any questions about Suraksha Mitra! Here's what I can assist with:\n\n**App Features:**\n• Emergency SOS and safety tools\n• Health consultations and insurance\n• Career development and training\n• Financial services and benefits\n• Community networking\n• Daily utilities and tracking\n\n**Getting Started:**\n• Complete your profile setup\n• Add emergency contacts\n• Explore different features\n• Join community discussions\n\n**Technical Support:**\n• App usage guidance\n• Feature explanations\n• Troubleshooting common issues\n• Account management\n\n**General Information:**\n• Security industry news\n• Weather and safety alerts\n• Local service information\n• Regulatory updates\n\nFeel free to ask me anything! I'm available 24/7 to help you make the most of Suraksha Mitra.`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !activeSession) return;

    const category = detectCategory(inputMessage);
    setCurrentPersona(AI_PERSONAS[category]);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      category
    };

    // Add user message
    setSessions(prev => prev.map(session => 
      session.id === activeSession.id 
        ? { ...session, messages: [...session.messages, userMessage] }
        : session
    ));

    setInputMessage("");
    setIsTyping(true);

    // Generate AI response
    const aiResponse = await generateAIResponse(inputMessage, category);
    
    const botMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      type: 'bot',
      content: aiResponse,
      timestamp: new Date(),
      category,
      quickActions: category === 'emergency' ? ["Call Emergency", "Activate SOS", "Find Safe Zone"] : 
                   category === 'health' ? ["Book Doctor", "Health Tips", "Meditation"] :
                   category === 'career' ? ["Browse Courses", "Job Board", "Career Path"] :
                   category === 'finance' ? ["Apply for Loan", "Insurance Plans", "Budget Tool"] :
                   ["Help Center", "Features Tour", "Contact Support"]
    };

    // Add bot message
    setSessions(prev => prev.map(session => 
      session.id === activeSession.id 
        ? { ...session, messages: [...session.messages, botMessage] }
        : session
    ));

    setIsTyping(false);
  };

  const handleQuickResponse = async (response: string) => {
    setInputMessage(response);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleQuickAction = (action: string) => {
    // Handle quick actions based on the context
    switch (action) {
      case "Call Emergency":
        alert("Connecting to emergency services...");
        break;
      case "Activate SOS":
        alert("Emergency SOS activated! Help is on the way.");
        break;
      case "Book Doctor":
        alert("Redirecting to health consultation...");
        break;
      case "Browse Courses":
        alert("Opening training courses...");
        break;
      case "Apply for Loan":
        alert("Opening loan application...");
        break;
      default:
        setInputMessage(action);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'health': return <Heart className="h-4 w-4 text-green-600" />;
      case 'career': return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'finance': return <DollarSign className="h-4 w-4 text-purple-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <p className="text-sm text-gray-600">{currentPersona.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                24/7 Available
              </Badge>
              <Badge className="bg-green-100 text-green-800 text-xs">
                Online
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4">
              {activeSession?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : `${currentPersona.bgColor} ${currentPersona.color} border`
                    } rounded-lg p-3`}
                  >
                    <div className="flex items-start space-x-2 mb-1">
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 mt-0.5" />
                      ) : (
                        getCategoryIcon(message.category)
                      )}
                      <span className="text-xs opacity-75">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-line">
                      {message.content}
                    </div>
                    
                    {message.quickActions && (
                      <div className="mt-3 space-y-2">
                        {message.quickActions.map((action, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant={message.type === 'user' ? "secondary" : "outline"}
                            className="text-xs w-full justify-start"
                            onClick={() => handleQuickAction(action)}
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`${currentPersona.bgColor} ${currentPersona.color} border rounded-lg p-3`}>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Quick Responses */}
        <div className="border-t p-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_RESPONSES.map((response, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleQuickResponse(response.text)}
              >
                <response.icon className="h-3 w-3 mr-1" />
                {response.text}
              </Button>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about safety, health, career, or finances..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Features Overview */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-xs font-medium">Emergency Support</p>
            </div>
            <div className="space-y-2">
              <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs font-medium">Health Advisor</p>
            </div>
            <div className="space-y-2">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs font-medium">Career Coach</p>
            </div>
            <div className="space-y-2">
              <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-xs font-medium">Financial Guide</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}