"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex max-w-lg flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-destructive/10"
        >
          <ShieldAlert className="text-destructive" size={56} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            You don&apos;t have access to this page
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {user?.role ? (
              <>
                This section is restricted for your current role (
                <span className="font-medium capitalize text-foreground">
                  {user.role}
                </span>
                ). If you think this is a mistake, contact support.
              </>
            ) : (
              "This section requires a different account role to access."
            )}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button className="w-full gap-2 sm:w-auto">
                <LayoutDashboard size={16} />
                Go to My Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                <Home size={16} />
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
