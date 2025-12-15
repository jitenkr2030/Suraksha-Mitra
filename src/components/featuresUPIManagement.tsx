"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Settings, CheckCircle, AlertCircle, Info, Shield, Smartphone } from "lucide-react";
import { UPIService } from "@/services/upiService";

export function UPIManagement() {
  const [upiService] = useState(() => UPIService.getInstance());
  const [upiId, setUpiId] = useState(upiService.getUPIId());
  const [merchantName, setMerchantName] = useState(upiService.getMerchantName());
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateAndSaveUPI = () => {
    if (upiService.validateUPIId(upiId)) {
      setIsValid(true);
      setIsEditing(false);
      // In real app, save to database
      console.log('UPI ID saved:', upiId);
      console.log('Merchant Name saved:', merchantName);
    } else {
      setIsValid(false);
    }
  };

  const cancelEdit = () => {
    setUpiId(upiService.getUPIId());
    setMerchantName(upiService.getMerchantName());
    setIsEditing(false);
    setIsValid(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>UPI Payment Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Zero Fee Policy:</strong> Suraksha Mitra uses UPI for all payments. 
              There are no transaction fees for users. All payments go directly to our UPI ID.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label htmlFor="upiId">UPI Payment Address</Label>
            <div className="flex space-x-2">
              <Input
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                disabled={!isEditing}
                placeholder="your-upi-id@bank"
                className="font-mono"
              />
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button onClick={validateAndSaveUPI}>
                    Save
                  </Button>
                  <Button variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
            {!isValid && (
              <p className="text-sm text-red-600">
                Please enter a valid UPI ID (e.g., name@bank)
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="merchantName">Merchant Display Name</Label>
            <div className="flex space-x-2">
              <Input
                id="merchantName"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                disabled={!isEditing}
                placeholder="Business Name"
              />
            </div>
            <p className="text-xs text-gray-500">
              This name will appear in the user's UPI app when they make a payment
            </p>
          </div>

          <div className="space-y-3">
            <Label>UPI Status</Label>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-600">Active and Ready</span>
              <Badge className="bg-green-100 text-green-800">
                No Fees
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Supported UPI Apps</Label>
            <div className="grid grid-cols-2 gap-2">
              <Badge variant="outline" className="justify-center">PhonePe</Badge>
              <Badge variant="outline" className="justify-center">Google Pay</Badge>
              <Badge variant="outline" className="justify-center">Paytm</Badge>
              <Badge variant="outline" className="justify-center">BHIM</Badge>
              <Badge variant="outline" className="justify-center">Amazon Pay</Badge>
              <Badge variant="outline" className="justify-center">All Banks</Badge>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Current UPI ID:</strong> <span className="font-mono">{upiService.getUPIId()}</span><br />
              <strong>Merchant Name:</strong> {upiService.getMerchantName()}<br />
              Users will see this information when they make payments.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>How Users Pay</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium">Payment Process:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>User selects subscription plan</li>
              <li>QR code and UPI ID are displayed</li>
              <li>User scans QR code or enters UPI ID manually</li>
              <li>User pays exact amount in their UPI app</li>
              <li>System verifies payment automatically</li>
              <li>Subscription is activated instantly</li>
            </ol>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Key Benefits:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Zero transaction fees for both parties</li>
              <li>Instant payment confirmation</li>
              <li>Bank-level security and encryption</li>
              <li>Works with all major UPI apps</li>
              <li>24/7 payment availability</li>
              <li>No third-party dependencies</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}