import { Suspense } from "react";
import type { Metadata } from "next";
import RegisterForm from "@/components/form/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | Crowdfund",
  description:
    "Join Crowdfund as a supporter to fund campaigns or as a creator to launch your own.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Suspense
        fallback={
          <div className="text-muted-foreground text-sm">Loading...</div>
        }
      >
        <RegisterForm />
      </Suspense>
    </div>
  );
}
