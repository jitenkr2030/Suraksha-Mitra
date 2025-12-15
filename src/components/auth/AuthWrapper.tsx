"use client";

import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm, RegisterData } from "@/components/auth/RegisterForm";
import { BiometricAuth } from "@/components/auth/BiometricAuth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Fingerprint, ArrowLeft } from "lucide-react";

export function AuthWrapper() {
  const { login, register, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'biometric'>('login');
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async (phone: string, password: string) => {
    setAuthLoading(true);
    const success = await login(phone, password);
    if (!success) {
      alert("Invalid phone number or password. Use password: 123456");
    }
    setAuthLoading(false);
  };

  const handleRegister = async (data: RegisterData) => {
    setAuthLoading(true);
    const success = await register(data);
    if (success) {
      alert("Registration successful! Please login.");
      setAuthMode('login');
    } else {
      alert("Registration failed. Please try again.");
    }
    setAuthLoading(false);
  };

  const handleBiometricSuccess = () => {
    // Auto-login with biometric success
    login("9876543210", "123456"); // Default user for demo
  };

  const handleBiometricError = (error: string) => {
    console.error("Biometric auth error:", error);
    alert("Biometric authentication failed. Please use traditional login.");
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {authMode === 'login' && (
        <div className="w-full max-w-md">
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode('register')}
            isLoading={authLoading}
          />
          
          {/* Biometric Authentication Option */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Fingerprint className="h-5 w-5" />
                <span>Quick Login</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setAuthMode('biometric')}
                variant="outline"
                className="w-full"
              >
                <Fingerprint className="h-4 w-4 mr-2" />
                Login with Biometrics
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {authMode === 'register' && (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthMode('login')}
          isLoading={authLoading}
        />
      )}

      {authMode === 'biometric' && (
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Button
              onClick={() => setAuthMode('login')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </div>
          <BiometricAuth
            onSuccess={handleBiometricSuccess}
            onError={handleBiometricError}
          />
        </div>
      )}
    </div>
  );
}