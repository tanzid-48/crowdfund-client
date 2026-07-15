"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { UserRole } from "@/types";
import { dashboardNav } from "@/lib/dashboard-nav";

export default function MobileSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const items = dashboardNav[role];
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm text-foreground"
      >
        <Menu size={18} />
        Menu
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-sm font-semibold text-foreground">
                Dashboard Menu
              </span>
              <button onClick={() => setOpen(false)}>
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
