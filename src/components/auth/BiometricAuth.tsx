"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Fingerprint, 
  User, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Smartphone,
  Key,
  Lock,
  Unlock
} from "lucide-react";

interface BiometricAuthProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface BiometricCapability {
  fingerprint: boolean;
  face: boolean;
  platform: string;
}

export function BiometricAuth({ onSuccess, onError }: BiometricAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face' | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'success' | 'error' | 'enrolling'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [showPinSetup, setShowPinSetup] = useState(false);

  // Check biometric capabilities on component mount
  useEffect(() => {
    checkBiometricCapabilities();
  }, []);

  const checkBiometricCapabilities = async () => {
    try {
      // Check if WebAuthn is available
      if (!window.PublicKeyCredential) {
        setIsAvailable(false);
        return;
      }

      // Check available authenticators
      const availableAuthenticators = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      
      if (availableAuthenticators) {
        setIsAvailable(true);
        
        // Detect platform and available biometric types
        const platform = navigator.platform.toLowerCase();
        const isMac = platform.includes('mac');
        const isWindows = platform.includes('win');
        const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

        if (isMobile) {
          // Mobile devices typically have both fingerprint and face recognition
          setBiometricType('fingerprint'); // Default to fingerprint
        } else if (isMac) {
          // macOS has Touch ID (fingerprint) on some models
          setBiometricType('fingerprint');
        } else if (isWindows) {
          // Windows Hello supports both fingerprint and face recognition
          setBiometricType('fingerprint'); // Default to fingerprint
        }
      }
    } catch (error) {
      console.error('Error checking biometric capabilities:', error);
      setIsAvailable(false);
    }
  };

  const enrollBiometric = async () => {
    setIsLoading(true);
    setAuthStatus('enrolling');
    
    try {
      // Create a new credential for biometric enrollment
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: "Suraksha Mitra",
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16),
          name: "security-guard@surakshamitra.com",
          displayName: "Security Guard",
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },
          { alg: -257, type: "public-key" },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      if (credential) {
        setIsEnrolled(true);
        setAuthStatus('success');
        onSuccess?.();
      }
    } catch (error) {
      console.error('Biometric enrollment failed:', error);
      setAuthStatus('error');
      setErrorMessage('Biometric enrollment failed. Please try again or use PIN.');
      onError?.('Biometric enrollment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithBiometric = async () => {
    if (!isEnrolled) {
      await enrollBiometric();
      return;
    }

    setIsLoading(true);
    setAuthStatus('idle');
    
    try {
      // Request authentication with existing credential
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        timeout: 60000,
        userVerification: "required",
      };

      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      if (assertion) {
        setAuthStatus('success');
        onSuccess?.();
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      setAuthStatus('error');
      setErrorMessage('Biometric authentication failed. Please try again or use PIN.');
      onError?.('Biometric authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const setupPinCode = () => {
    setShowPinSetup(true);
  };

  const verifyPinCode = () => {
    if (pinCode.length === 4) {
      // In a real app, this would verify against stored PIN
      setAuthStatus('success');
      onSuccess?.();
    }
  };

  const getBiometricIcon = () => {
    if (biometricType === 'face') {
      return <User className="h-8 w-8" />;
    }
    return <Fingerprint className="h-8 w-8" />;
  };

  const getBiometricName = () => {
    if (biometricType === 'face') {
      return 'Face Recognition';
    }
    return 'Fingerprint';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Biometric Authentication</h1>
        <p className="text-gray-600">Secure login with your biometric data</p>
      </div>

      {showPinSetup ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Setup PIN Code</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Enter a 4-digit PIN code as backup authentication method
              </p>
              <Input
                type="password"
                maxLength={4}
                placeholder="Enter 4-digit PIN"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="text-center text-2xl letter-spacing-wide"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={verifyPinCode}
                disabled={pinCode.length !== 4}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify PIN
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPinSetup(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Biometric Status */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isAvailable ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {isAvailable ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">Biometric Status</h3>
                    <p className="text-sm text-gray-600">
                      {isAvailable ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                </div>
                <Badge variant={isAvailable ? "default" : "destructive"}>
                  {isAvailable ? 'Ready' : 'Unavailable'}
                </Badge>
              </div>

              {isAvailable && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                      {getBiometricIcon()}
                    </div>
                    <div>
                      <p className="font-medium">{getBiometricName()}</p>
                      <p className="text-sm text-gray-600">
                        {isEnrolled ? 'Enrolled' : 'Not enrolled'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Authentication Actions */}
          {isAvailable ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={authenticateWithBiometric}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {getBiometricIcon()}
                      <span>{isEnrolled ? 'Authenticate' : 'Enroll'} {getBiometricName()}</span>
                    </div>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 text-gray-500">OR</span>
                  </div>
                </div>

                <Button
                  onClick={setupPinCode}
                  variant="outline"
                  className="w-full"
                >
                  <Key className="h-4 w-4 mr-2" />
                  Setup PIN Code
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Biometric authentication is not available on this device. 
                Please use PIN code authentication or check if your device supports biometric features.
              </AlertDescription>
            </Alert>
          )}

          {/* Status Messages */}
          {authStatus === 'success' && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Authentication successful! Welcome back.
              </AlertDescription>
            </Alert>
          )}

          {authStatus === 'error' && errorMessage && (
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Device Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>Device Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform:</span>
                <span className="font-medium">{navigator.platform}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">User Agent:</span>
                <span className="font-medium text-xs">
                  {navigator.userAgent.split(' ')[0]}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">WebAuthn Support:</span>
                <Badge variant={window.PublicKeyCredential ? "default" : "destructive"}>
                  {window.PublicKeyCredential ? 'Supported' : 'Not Supported'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}