import { PaymentProvider, PaymentRequest, PaymentResponse, PaymentVerification } from "./types";

class StripeProvider implements PaymentProvider {
  name = "stripe";

  async initializePayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!process.env.STRIPE_SECRET_KEY) {
      return { success: false, provider: this.name, message: "Stripe is not configured" };
    }
    // Architecture only — integrate with @stripe/stripe-js later
    return {
      success: false,
      provider: this.name,
      message: "Stripe integration is not active. Provide STRIPE_SECRET_KEY to enable it.",
    };
  }

  async verifyPayment(_verification: PaymentVerification): Promise<PaymentResponse> {
    return { success: false, provider: this.name, message: "Stripe verification not implemented" };
  }
}

class PaystackProvider implements PaymentProvider {
  name = "paystack";

  async initializePayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return { success: false, provider: this.name, message: "Paystack is not configured" };
    }
    return {
      success: false,
      provider: this.name,
      message: "Paystack integration is not active. Provide PAYSTACK_SECRET_KEY to enable it.",
    };
  }

  async verifyPayment(_verification: PaymentVerification): Promise<PaymentResponse> {
    return { success: false, provider: this.name, message: "Paystack verification not implemented" };
  }
}

class FlutterwaveProvider implements PaymentProvider {
  name = "flutterwave";

  async initializePayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (!process.env.FLUTTERWAVE_SECRET_KEY) {
      return { success: false, provider: this.name, message: "Flutterwave is not configured" };
    }
    return {
      success: false,
      provider: this.name,
      message: "Flutterwave integration is not active. Provide FLUTTERWAVE_SECRET_KEY to enable it.",
    };
  }

  async verifyPayment(_verification: PaymentVerification): Promise<PaymentResponse> {
    return { success: false, provider: this.name, message: "Flutterwave verification not implemented" };
  }
}

const providers: Record<string, PaymentProvider> = {
  stripe: new StripeProvider(),
  paystack: new PaystackProvider(),
  flutterwave: new FlutterwaveProvider(),
};

export type PaymentProviderName = "stripe" | "paystack" | "flutterwave";

export function getPaymentProvider(provider: string): PaymentProvider | null {
  return providers[provider] ?? null;
}

export async function initializePayment(provider: string, request: PaymentRequest): Promise<PaymentResponse> {
  const p = getPaymentProvider(provider);
  if (!p) return { success: false, provider, message: "Unknown payment provider" };
  return p.initializePayment(request);
}

export async function verifyPayment(provider: string, verification: PaymentVerification): Promise<PaymentResponse> {
  const p = getPaymentProvider(provider);
  if (!p) return { success: false, provider, message: "Unknown payment provider" };
  return p.verifyPayment(verification);
}
