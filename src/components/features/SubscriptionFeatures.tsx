"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Crown, 
  Star, 
  CheckCircle, 
  XCircle, 
  Calendar,
  CreditCard,
  Gift,
  Shield,
  Zap,
  Users,
  Database,
  TrendingUp,
  Award,
  ArrowRight,
  IndianRupee,
  MapPin,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Brain
} from "lucide-react";
import { UPIPayment } from "./featuresUPIPayment";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  currency: string;
  description: string;
  features: string[];
  popular?: boolean;
  savings?: string;
  originalPrice?: number;
}

interface UserSubscription {
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'none';
  currentPeriodEnd: Date | null;
  autoRenew: boolean;
}

export function SubscriptionFeatures() {
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    planId: 'free',
    status: 'none',
    currentPeriodEnd: null,
    autoRenew: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      period: 'month',
      currency: 'INR',
      description: 'Essential safety features for everyone',
      features: [
        'Emergency SOS',
        'Offline Mode',
        'Basic Profile Management',
        'Emergency Contacts',
        'Location Sharing',
        'Safety Alerts'
      ]
    },
    {
      id: 'monthly',
      name: 'Premium Monthly',
      price: 99,
      period: 'month',
      currency: 'INR',
      description: 'Full access to all premium features',
      features: [
        'Emergency SOS',
        'Offline Mode',
        'Voice Commands',
        'Biometric Authentication',
        'Health Consultation',
        'Insurance Plans',
        'Emergency Loans',
        'Training Courses',
        'GPS Tracking',
        'Priority Support',
        'AI-Powered Chatbot',
        'Basic Analytics'
      ]
    },
    {
      id: 'yearly',
      name: 'Premium Yearly',
      price: 999,
      period: 'year',
      currency: 'INR',
      originalPrice: 1188,
      description: 'Best value with 2 months free',
      savings: 'Save ₹189',
      popular: true,
      features: [
        'Emergency SOS',
        'Offline Mode',
        'Voice Commands',
        'Biometric Authentication',
        'Health Consultation',
        'Insurance Plans',
        'Emergency Loans',
        'Training Courses',
        'GPS Tracking',
        'Priority Support',
        'AI-Powered Chatbot',
        'Basic Analytics',
        'Advanced Analytics',
        'Predictive Insights',
        'Unlimited Storage',
        'Family Sharing',
        'Premium Content'
      ]
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      setSelectedPlan(planId);
      setUserSubscription({
        planId: 'free',
        status: 'active',
        currentPeriodEnd: null,
        autoRenew: false
      });
      return;
    }

    setSelectedPlan(planId);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setIsProcessing(false);
    setShowPaymentForm(false);
    
    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    const periodEnd = new Date();
    
    if (plan?.period === 'month') {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    setUserSubscription({
      planId: selectedPlan,
      status: 'active',
      currentPeriodEnd: periodEnd,
      autoRenew: true
    });

    alert(`🎉 Successfully subscribed to ${plan?.name}! Transaction ID: ${transactionId}`);
  };

  const handlePaymentError = (error: string) => {
    setIsProcessing(false);
    alert(`Payment failed: ${error}`);
  };

  const handleCancelSubscription = async () => {
    if (confirm('Are you sure you want to cancel your subscription? You will continue to have access until the end of your current billing period.')) {
      setUserSubscription(prev => ({
        ...prev,
        status: 'cancelled',
        autoRenew: false
      }));
      alert('Subscription cancelled successfully.');
    }
  };

  const formatPrice = (price: number, currency: string = 'INR'): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Never';
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCurrentPlan = () => {
    return subscriptionPlans.find(plan => plan.id === userSubscription.planId);
  };

  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'Emergency SOS': <Shield className="h-4 w-4" />,
      'Offline Mode': <Database className="h-4 w-4" />,
      'Voice Commands': <Zap className="h-4 w-4" />,
      'Biometric Authentication': <CheckCircle className="h-4 w-4" />,
      'Health Consultation': <Star className="h-4 w-4" />,
      'Insurance Plans': <Shield className="h-4 w-4" />,
      'Emergency Loans': <CreditCard className="h-4 w-4" />,
      'Training Courses': <Award className="h-4 w-4" />,
      'GPS Tracking': <MapPin className="h-4 w-4" />,
      'Priority Support': <Users className="h-4 w-4" />,
      'AI-Powered Chatbot': <MessageSquare className="h-4 w-4" />,
      'Basic Analytics': <TrendingUp className="h-4 w-4" />,
      'Advanced Analytics': <BarChart3 className="h-4 w-4" />,
      'Predictive Insights': <Brain className="h-4 w-4" />,
      'Unlimited Storage': <Database className="h-4 w-4" />,
      'Family Sharing': <Users className="h-4 w-4" />,
      'Premium Content': <Crown className="h-4 w-4" />,
      'Basic Profile Management': <CheckCircle className="h-4 w-4" />,
      'Emergency Contacts': <Users className="h-4 w-4" />,
      'Location Sharing': <MapPin className="h-4 w-4" />,
      'Safety Alerts': <AlertTriangle className="h-4 w-4" />
    };
    
    return iconMap[feature] || <CheckCircle className="h-4 w-4" />;
  };

  const currentPlan = getCurrentPlan();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="text-gray-600">Choose the plan that works best for you</p>
      </div>

      {/* Current Subscription Status */}
      {userSubscription.status !== 'none' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  userSubscription.status === 'active' ? 'bg-green-100' : 'bg-orange-100'
                }`}>
                  {userSubscription.status === 'active' ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-orange-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <p className="text-sm text-gray-600">
                    {currentPlan?.name} • {userSubscription.status === 'active' ? 'Active' : 'Cancelled'}
                  </p>
                </div>
              </div>
              <Badge variant={userSubscription.status === 'active' ? "default" : "secondary"}>
                {userSubscription.status === 'active' ? 'Active' : 'Cancelled'}
              </Badge>
            </div>

            {userSubscription.currentPeriodEnd && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Period Ends</p>
                  <p className="font-medium">{formatDate(userSubscription.currentPeriodEnd)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Auto Renew</p>
                  <p className="font-medium">{userSubscription.autoRenew ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            )}

            {userSubscription.status === 'active' && userSubscription.planId !== 'free' && (
              <div className="mt-4">
                <Button
                  onClick={handleCancelSubscription}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Cancel Subscription
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                {plan.id === 'free' ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <Crown className="h-8 w-8 text-yellow-500" />
                )}
              </div>
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <p className="text-sm text-gray-600">{plan.description}</p>
              
              <div className="mt-4">
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">
                    <IndianRupee className="h-6 w-6 inline" />
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                </div>
                
                {plan.originalPrice && (
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-sm text-gray-500 line-through">
                      <IndianRupee className="h-3 w-3 inline" />
                      {plan.originalPrice}
                    </span>
                    <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                      {plan.savings}
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {getFeatureIcon(feature)}
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isProcessing || userSubscription.planId === plan.id}
                className={`w-full ${
                  plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''
                } ${
                  userSubscription.planId === plan.id ? 'bg-gray-500 hover:bg-gray-600' : ''
                }`}
              >
                {userSubscription.planId === plan.id ? (
                  'Current Plan'
                ) : plan.id === 'free' ? (
                  'Downgrade to Free'
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* UPI Payment Modal */}
      {showPaymentForm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Complete Your Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <UPIPayment
                amount={subscriptionPlans.find(p => p.id === selectedPlan)?.price || 0}
                planName={subscriptionPlans.find(p => p.id === selectedPlan)?.name || ''}
                planType={subscriptionPlans.find(p => p.id === selectedPlan)?.period === 'month' ? 'monthly' : 'yearly'}
                userId="guard_user_001" // In real app, get from auth context
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* UPI Payment Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Why Pay with UPI?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Zero Transaction Fees</p>
                  <p className="text-xs text-gray-600">No hidden charges - pay exact amount</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Instant Activation</p>
                  <p className="text-xs text-gray-600">Subscription activates immediately</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Bank-Level Security</p>
                  <p className="text-xs text-gray-600">Protected by NPCI & RBI</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Universal Acceptance</p>
                  <p className="text-xs text-gray-600">Works with all UPI apps & banks</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">24/7 Availability</p>
                  <p className="text-xs text-gray-600">Pay anytime, anywhere</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Direct Payment</p>
                  <p className="text-xs text-gray-600">No middlemen involved</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Our UPI ID:</strong> <span className="font-mono">surakshamitra@ybl</span><br />
              <strong>Payment Process:</strong> Scan QR code → Pay exact amount → Get instant activation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Features Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Feature</th>
                  {subscriptionPlans.map(plan => (
                    <th key={plan.id} className="text-center py-2">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'Emergency SOS',
                  'Offline Mode',
                  'Voice Commands',
                  'Biometric Authentication',
                  'Health Consultation',
                  'Insurance Plans',
                  'Emergency Loans',
                  'Training Courses',
                  'GPS Tracking',
                  'Priority Support',
                  'AI-Powered Chatbot',
                  'Basic Analytics',
                  'Advanced Analytics',
                  'Predictive Insights',
                  'Unlimited Storage',
                  'Family Sharing',
                  'Premium Content'
                ].map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{feature}</td>
                    {subscriptionPlans.map(plan => (
                      <td key={plan.id} className="text-center py-2">
                        {plan.features.includes(feature) ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5" />
            <span>Why Go Premium?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Enhanced Safety</h4>
                <p className="text-sm text-gray-600">
                  Advanced emergency features with priority response
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Family Protection</h4>
                <p className="text-sm text-gray-600">
                  Share premium features with your family members
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium">Career Growth</h4>
                <p className="text-sm text-gray-600">
                  Access exclusive training and certification programs
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium">Priority Support</h4>
                <p className="text-sm text-gray-600">
                  24/7 dedicated support for premium members
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Money Back Guarantee */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>30-Day Money Back Guarantee:</strong> Not satisfied with your premium subscription? 
          Cancel within 30 days for a full refund. No questions asked.
        </AlertDescription>
      </Alert>
    </div>
  );
}