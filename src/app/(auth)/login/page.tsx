import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/form/LoginForm";

export const metadata: Metadata = {
  title: "Log In | Crowdfund",
  description: "Log in to your Crowdfund account to manage campaigns, contributions, and credits.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}