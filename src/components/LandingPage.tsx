"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ArrowRight, Heart, DollarSign, BookOpen, Users, Smartphone, MapPin, MessageSquare, BarChart3, Award, Clock, Star } from "lucide-react";

interface LandingPageProps {
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export function LandingPage({ onShowLogin, onShowRegister }: LandingPageProps) {
  const features = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "24/7 doctor consultations, health insurance, mental health support, and fitness tracking",
      color: "bg-red-500",
      emoji: "❤️"
    },
    {
      icon: DollarSign,
      title: "Financial Benefits",
      description: "Emergency loans, insurance plans, salary calculator, and financial planning tools",
      color: "bg-green-500",
      emoji: "💰"
    },
    {
      icon: BookOpen,
      title: "Training & Development",
      description: "Certification courses, skill assessments, career growth opportunities, and digital certificates",
      color: "bg-blue-500",
      emoji: "📚"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow professionals, job board, forums, events, and mentorship programs",
      color: "bg-purple-500",
      emoji: "👥"
    },
    {
      icon: Shield,
      title: "Safety & Emergency",
      description: "Emergency SOS, safety alerts, quick emergency calls, and safe zones locator",
      color: "bg-red-600",
      emoji: "🚨"
    },
    {
      icon: Smartphone,
      title: "Digital ID",
      description: "Professional identity with QR code, document storage, and skills certification",
      color: "bg-indigo-500",
      emoji: "🆔"
    },
    {
      icon: MapPin,
      title: "GPS Tracking",
      description: "Real-time location sharing, duty tracking, and attendance system",
      color: "bg-teal-500",
      emoji: "📍"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "24/7 virtual support, voice commands, and intelligent query resolution",
      color: "bg-purple-600",
      emoji: "🤖"
    }
  ];

  const benefits = [
    {
      title: "Free Doctor Consultation",
      description: "Access 24/7 telemedicine services with qualified doctors",
      icon: "👨‍⚕️"
    },
    {
      title: "Emergency Loans",
      description: "Quick access to funds when you need them most (₹2,000-₹10,000)",
      icon: "💸"
    },
    {
      title: "Accident Insurance",
      description: "Comprehensive coverage starting from just ₹50/month",
      icon: "🛡️"
    },
    {
      title: "Legal Support",
      description: "Free legal consultation and rights protection services",
      icon: "⚖️"
    },
    {
      title: "Family Education",
      description: "Scholarships and educational support for your children",
      icon: "🎓"
    },
    {
      title: "Career Growth",
      description: "Advanced training and certification for better opportunities",
      icon: "📈"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Security Supervisor",
      content: "Suraksha Mitra has transformed my career. The training courses helped me get promoted, and the health benefits give me peace of mind.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Security Guard",
      content: "The emergency SOS feature saved my colleague's life during a medical emergency. This app is truly life-saving!",
      rating: 5
    },
    {
      name: "Mohammed Ali",
      role: "Security Officer",
      content: "The financial planning tools and emergency loans have helped me support my family better. Thank you, Suraksha Mitra!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Suraksha Mitra</h1>
              <Badge className="bg-green-100 text-green-800">Beta</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={onShowLogin}
                className="hidden sm:flex"
              >
                Login
              </Button>
              <Button 
                onClick={onShowRegister}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <Badge className="mb-4 bg-blue-100 text-blue-800 text-sm px-4 py-2">
              <Star className="w-4 h-4 mr-1" />
              Trusted by 50,000+ Security Professionals
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Empowering India's
            <span className="text-blue-600 block">Security Heroes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Your complete welfare platform offering health benefits, financial support, career growth, 
            and emergency assistance - all designed specifically for security professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={onShowRegister}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 h-14 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Now - It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onShowLogin}
              className="text-lg px-8 py-4 h-14 border-2 hover:bg-gray-50 transition-all duration-300"
            >
              Already a Member? Login
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Suraksha Mitra?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges faced by security professionals and provide tailored solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Features for Your Complete Welfare
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to thrive in your personal and professional life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className={`${feature.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Community
            </h2>
            <p className="text-lg text-gray-600">Hear from security professionals who have transformed their lives</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Training Courses</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">₹50Cr+</div>
              <div className="text-blue-100">Benefits Distributed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Career and Life?
          </h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of security professionals who are already benefiting from comprehensive welfare support, 
            career growth opportunities, and emergency assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onShowRegister}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onShowLogin}
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 h-14 transition-all duration-300"
            >
              Sign In to Your Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <h4 className="text-lg font-semibold">Suraksha Mitra</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering security professionals with comprehensive welfare and growth solutions across India.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Features</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Health & Wellness</li>
                <li>Financial Benefits</li>
                <li>Training & Development</li>
                <li>Emergency Services</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Emergency Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2024 Suraksha Mitra. All rights reserved. | Built with ❤️ for India's Security Heroes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}