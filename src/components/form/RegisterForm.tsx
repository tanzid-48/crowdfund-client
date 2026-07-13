"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth.schema";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "supporter" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      image: values.photoURL,
      // @ts-expect-error -- additionalField, not in base type
      role: values.role,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Account created!");
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 text-card-foreground">
      <div className="space-y-1 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Join CampusFund as a supporter or creator
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="Enter Your Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="off"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="photoURL">Profile photo URL</Label>
          <Input
            id="photoURL"
            placeholder="https://..."
            {...register("photoURL")}
          />
          {errors.photoURL && (
            <p className="text-xs text-destructive">
              {errors.photoURL.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password"
           placeholder="Enter Your password" {...register("password")} />
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>I want to join as</Label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setValue("role", "supporter")}
              className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                selectedRole === "supporter"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              Supporter
            </button>
            <button
              type="button"
              onClick={() => setValue("role", "creator")}
              className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                selectedRole === "creator"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              Creator
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
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
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
