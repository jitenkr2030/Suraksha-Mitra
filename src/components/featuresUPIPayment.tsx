"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  Clock,
  IndianRupee,
  Copy,
  ExternalLink,
  RefreshCw,
  Info
} from "lucide-react";
import { UPIService, UPIPaymentRequest } from "@/services/upiService";

interface UPIPaymentProps {
  amount: number;
  planName: string;
  planType: 'monthly' | 'yearly' | 'free';
  userId: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
}

export function UPIPayment({ 
  amount, 
  planName, 
  planType, 
  userId, 
  onSuccess, 
  onError 
}: UPIPaymentProps) {
  const [upiService] = useState(() => UPIService.getInstance());
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [upiUrl, setUpiUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Initialize payment
  const initializePayment = () => {
    const paymentRequest: UPIPaymentRequest = {
      amount,
      purpose: `Suraksha Mitra ${planName} Subscription`,
      orderId: upiService.generateOrderId(userId, planType),
      userId,
      planType
    };

    const url = upiService.generateUPIUrl(paymentRequest);
    const qrUrl = upiService.generateUPIQRCode(paymentRequest);

    setUpiUrl(url);
    setQrCodeUrl(qrUrl);
    setOrderId(paymentRequest.orderId);
    setShowQR(true);
    setPaymentStatus('pending');
  };

  // Copy UPI URL to clipboard
  const copyUPIUrl = async () => {
    try {
      await navigator.clipboard.writeText(upiUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy UPI URL:', err);
    }
  };

  // Open UPI app directly
  const openUPIApp = () => {
    if (upiUrl) {
      window.location.href = upiUrl;
    }
  };

  // Check payment status
  const checkPaymentStatus = async () => {
    if (!orderId) return;

    setIsProcessing(true);
    try {
      const response = await upiService.checkPaymentStatus(orderId);
      
      if (response.success) {
        setPaymentStatus('success');
        onSuccess(response.transactionId!);
      } else {
        setPaymentStatus('failed');
        onError(response.error || 'Payment verification failed');
      }
    } catch (error) {
      setPaymentStatus('failed');
      onError('Failed to check payment status');
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset payment
  const resetPayment = () => {
    setShowQR(false);
    setPaymentStatus('pending');
    setOrderId('');
    setUpiUrl('');
    setQrCodeUrl('');
  };

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IndianRupee className="h-5 w-5" />
            <span>Payment Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium">{planName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount</span>
              <span className="font-bold text-lg">
                <IndianRupee className="h-4 w-4 inline" />
                {amount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method</span>
              <Badge className="bg-green-100 text-green-800">
                UPI (No Fees)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Actions */}
      {!showQR ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Smartphone className="h-16 w-16 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Pay with UPI</h3>
                <p className="text-gray-600 text-sm">
                  No transaction fees • Instant payment • Secure &amp; reliable
                </p>
              </div>
              <Button 
                onClick={initializePayment}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate UPI Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* QR Code Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Scan QR Code or Pay Directly</span>
                <Button variant="outline" size="sm" onClick={resetPayment}>
                  Change Amount
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center relative">
                    {/* QR Code Placeholder - In real implementation, use QR code library */}
                    <div className="text-center">
                      <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        <div className="text-center">
                          <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">QR Code for Payment</p>
                          <p className="text-[10px] text-gray-400 mt-1">
                            Amount: ₹{amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Scan with any UPI app (PhonePe, Google Pay, Paytm, etc.)
                  </p>
                </div>

                {/* UPI ID Display */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-900 mb-2">Or pay directly to our UPI ID:</p>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="font-mono text-lg font-bold text-blue-900">
                        {upiService.getUPIId()}
                      </p>
                    </div>
                    <p className="text-xs text-blue-700 mt-2">
                      Merchant: {upiService.getMerchantName()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={copyUPIUrl}
                    variant="outline"
                    disabled={copied}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                  <Button
                    onClick={openUPIApp}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open UPI App
                  </Button>
                </div>

                {/* Important Instructions */}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Send exactly <strong>₹{amount}</strong> to the UPI ID above. 
                    After payment, click "Verify Payment" below to activate your subscription immediately.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Payment Status</span>
                  <div className="flex items-center space-x-2">
                    {paymentStatus === 'pending' && (
                      <>
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="text-yellow-600">Pending Verification</span>
                      </>
                    )}
                    {paymentStatus === 'success' && (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Payment Successful</span>
                      </>
                    )}
                    {paymentStatus === 'failed' && (
                      <>
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-red-600">Payment Failed</span>
                      </>
                    )}
                  </div>
                </div>

                {paymentStatus === 'pending' && (
                  <>
                    <Alert>
                      <AlertDescription>
                        <strong>Next Step:</strong> After completing the payment in your UPI app, 
                        click "Verify Payment" below to activate your subscription instantly.
                      </AlertDescription>
                    </Alert>
                    <Button
                      onClick={checkPaymentStatus}
                      disabled={isProcessing}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Verifying Payment...</span>
                        </div>
                      ) : (
                        'Verify Payment'
                      )}
                    </Button>
                  </>
                )}

                {paymentStatus === 'failed' && (
                  <div className="space-y-3">
                    <Alert className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800">
                        <strong>Payment Issue:</strong> We couldn't verify your payment. Please ensure:
                        <ul className="list-disc list-inside mt-1 text-sm">
                          <li>You sent exactly ₹{amount}</li>
                          <li>You used the correct UPI ID: {upiService.getUPIId()}</li>
                          <li>Payment was successful in your UPI app</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={checkPaymentStatus}
                        variant="outline"
                        disabled={isProcessing}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                      <Button onClick={resetPayment}>
                        Start Over
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}