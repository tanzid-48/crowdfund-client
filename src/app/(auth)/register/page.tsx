import { Suspense } from "react";
import RegisterForm from "@/components/form/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}