"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Bell, User, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, isAuthenticated, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const navLinks = [{ href: "/explore-campaigns", label: "Explore Campaigns" }];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-11/12 items-center justify-between px-4">
        <Link
          href="/"
          className="font-heading text-xl font-bold text-foreground"
        >
          Crowd<span className="text-primary">fund</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                isActive(link.href)
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!loading && !isAuthenticated && (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}

          {!loading && isAuthenticated && (
            <>
              <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {user?.credits ?? 0} credits
              </div>

              <button className="relative text-muted-foreground hover:text-foreground">
                <Bell size={20} />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="h-9 w-9 cursor-pointer border border-border">
                    <AvatarImage
                      src={user?.photoURL || undefined}
                      alt={user?.name}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <p className="text-sm font-medium text-foreground">
                        {user?.name}
                      </p>
                      <p className="text-xs font-normal text-muted-foreground">
                        {user?.email}
                      </p>
                      <p className="mt-1 text-xs font-normal capitalize text-primary">
                        {user?.role}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard")}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/profile")}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <User size={16} />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
                    >
                      <LogOut size={16} />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <ThemeToggle />
          <a
            href="https://github.com/tanzid-48/crowdfund-client"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Join as Developer
          </a>
        </nav>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="flex flex-col gap-3 border-t border-border bg-background px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={
                isActive(link.href)
                  ? "font-medium text-primary"
                  : "text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}

          {!loading && !isAuthenticated && (
            <>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-foreground"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="text-foreground"
              >
                Register
              </Link>
            </>
          )}

          {!loading && isAuthenticated && (
            <>
              <span className="text-sm text-muted-foreground">
                {user?.credits ?? 0} credits
              </span>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-foreground"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-destructive"
              >
                Logout
              </button>
            </>
          )}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
