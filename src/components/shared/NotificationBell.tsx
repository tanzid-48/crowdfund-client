"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { getNotifications } from "@/lib/api/notifications";
import { markNotificationSeen, markAllSeen } from "@/lib/action/notifications";
import { useAuth } from "@/hooks/useAuth";
import type { Notification } from "@/types";

export default function NotificationBell() {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["notifications", user?.email],
    queryFn: () => getNotifications(user!.email),
    enabled: !!user?.email,
    refetchInterval: 30000, // প্রতি ৩০ সেকেন্ডে poll করবে
  });

  const unreadCount = notifications.filter((n) => !n.seen).length;

  // outside click করলে popup বন্ধ হবে
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleNotificationClick = async (n: Notification) => {
    if (!n.seen) {
      await markNotificationSeen(n._id as string);
      queryClient.invalidateQueries({
        queryKey: ["notifications", user?.email],
      });
    }
    setOpen(false);
    router.push(n.actionRoute);
  };

  const handleMarkAllRead = async () => {
    if (!user?.email) return;
    await markAllSeen(user.email);
    queryClient.invalidateQueries({ queryKey: ["notifications", user.email] });
  };

  return (
    <div className="relative" ref={popupRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-muted-foreground hover:text-foreground"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-80 rounded-lg border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold text-foreground">
              Notifications
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                No notifications yet
              </p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n._id}
                  onClick={() => handleNotificationClick(n)}
                  className={`flex w-full flex-col gap-1 border-b border-border px-4 py-3 text-left text-xs last:border-0 hover:bg-accent ${
                    !n.seen ? "bg-primary/5" : ""
                  }`}
                >
                  <p
                    className={`text-foreground ${!n.seen ? "font-medium" : ""}`}
                  >
                    {n.message}
                  </p>
                  <span className="text-muted-foreground">
                    {new Date(n.time).toLocaleString()}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
