"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  const updateCredits = useUserStore((state) => state.updateCredits);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !user) return;

    setProcessing(true);
    try {
      const { clientSecret } = await createPaymentIntent(amount);

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
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
      <div className="rounded-md border border-input px-3 py-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "var(--foreground)",
                "::placeholder": { color: "var(--muted-foreground)" },
              },
              invalid: { color: "var(--destructive)" },
            },
          }}
        />
      </div>
      <Button type="submit" className="w-full" disabled={!stripe || processing}>
        {processing ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  );
}
