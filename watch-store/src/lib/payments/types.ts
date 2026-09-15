export interface PaymentRequest {
  amount: number;
  currency: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  metadata?: Record<string, string | number | boolean>;
  callbackUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  provider: string;
  reference?: string;
  authorizationUrl?: string;
  clientSecret?: string;
  publicKey?: string;
  message: string;
}

export interface PaymentVerification {
  reference: string;
  provider: string;
}

export interface PaymentProvider {
  name: string;
  initializePayment(request: PaymentRequest): Promise<PaymentResponse>;
  verifyPayment(verification: PaymentVerification): Promise<PaymentResponse>;
}
