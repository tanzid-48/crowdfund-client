"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.6 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.1-2 13.7-5.3l-6.3-5.3C29.4 35 26.8 36 24 36c-5.3 0-9.6-3.1-11.3-7.6l-6.6 5.1C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.3 5.3C40.9 36.4 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }

    toast.success("Welcome back!");
    router.push(redirectTo);
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 text-card-foreground">
      <div className="space-y-1 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Log in to your Crowdfund account
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your password"
              autoComplete="off"
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <button
        type="button"
        onClick={async () => {
          await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
          });
        }}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card py-2 text-sm text-foreground transition-colors hover:bg-accent"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-primary hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
