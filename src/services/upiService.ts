export interface UPIPaymentRequest {
  amount: number;
  purpose: string;
  orderId: string;
  userId: string;
  planType: 'monthly' | 'yearly' | 'free';
}

export interface UPIPaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export class UPIService {
  private static instance: UPIService;
  private upiId: string = 'surakshamitra@ybl'; // Your UPI ID
  private merchantName: string = 'Suraksha Mitra';

  static getInstance(): UPIService {
    if (!UPIService.instance) {
      UPIService.instance = new UPIService();
    }
    return UPIService.instance;
  }

  // Generate UPI payment URL
  generateUPIUrl(request: UPIPaymentRequest): string {
    const params = new URLSearchParams({
      pa: this.upiId, // Payee address
      pn: this.merchantName, // Payee name
      am: request.amount.toString(), // Amount
      cu: 'INR', // Currency
      tn: request.purpose, // Transaction note
      tr: request.orderId, // Transaction reference
      mc: '5814', // Merchant category code (Education/Training)
    });

    return `upi://pay?${params.toString()}`;
  }

  // Generate UPI QR Code URL for QR code generation
  generateUPIQRCode(request: UPIPaymentRequest): string {
    const upiUrl = this.generateUPIUrl(request);
    return upiUrl;
  }

  // Validate UPI ID format
  validateUPIId(upiId: string): boolean {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    return upiRegex.test(upiId);
  }

  // Check payment status (simulate - in real app, you'd use webhooks)
  async checkPaymentStatus(orderId: string): Promise<UPIPaymentResponse> {
    // In a real implementation, this would check with your bank's API
    // For now, we'll simulate the check
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate payment verification
        const isSuccessful = Math.random() > 0.1; // 90% success rate
        resolve({
          success: isSuccessful,
          transactionId: isSuccessful ? `TXN${Date.now()}` : undefined,
          error: isSuccessful ? undefined : 'Payment failed or pending'
        });
      }, 2000);
    });
  }

  // Generate unique order ID
  generateOrderId(userId: string, planType: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5);
    return `SM${timestamp}${random}${planType.charAt(0).toUpperCase()}`;
  }

  // Get the UPI ID for display
  getUPIId(): string {
    return this.upiId;
  }

  // Get merchant name for display
  getMerchantName(): string {
    return this.merchantName;
  }
}