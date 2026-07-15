"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createPaymentIntent } from "@/lib/api/payments";
import { savePayment } from "@/lib/action/payments";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/store/useUserStore";

export default function CheckoutForm({
  amount,
  credits,
  onSuccess,
}: {
  amount: number;
  credits: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();
  const updateCredits = useUserStore((state) => state.updateCredits);
  const [processing, setProcessing] = useState(false);

  const isDark = resolvedTheme === "dark";

  // iframe-এর ভিতরে CSS variable কাজ করে না, তাই actual hex color পাঠাতে হবে
  const elementStyle = {
    style: {
      base: {
        fontSize: "15px",
        color: isDark ? "#F7F8FA" : "#0B1220",
        fontFamily: "Inter, sans-serif",
        "::placeholder": { color: isDark ? "#64748B" : "#94A3B8" },
        iconColor: isDark ? "#94A3B8" : "#64748B",
      },
      invalid: {
        color: "#EF4444",
        iconColor: "#EF4444",
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !user) return;

    setProcessing(true);
    try {
      const { clientSecret } = await createPaymentIntent(amount);

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumberElement,
            billing_details: { name: user.name, email: user.email },
          },
        },
      );

      if (error) {
        toast.error(error.message || "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await savePayment({
          email: user.email,
          amount,
          transactionId: paymentIntent.id,
        });
        updateCredits(user.credits + credits);
        toast.success(`Payment successful! ${credits} credits added.`);
        onSuccess();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Card number</Label>
        <div className="rounded-md border border-input px-3 py-2.5">
          <CardNumberElement options={elementStyle} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Expiry</Label>
          <div className="rounded-md border border-input px-3 py-2.5">
            <CardExpiryElement options={elementStyle} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>CVC</Label>
          <div className="rounded-md border border-input px-3 py-2.5">
            <CardCvcElement options={elementStyle} />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!stripe || processing}>
        {processing ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
}
