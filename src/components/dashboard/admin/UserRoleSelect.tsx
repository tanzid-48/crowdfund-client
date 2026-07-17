"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateUserRole } from "@/lib/action/users";
import type { UserRole } from "@/types";

const roles: UserRole[] = ["supporter", "creator", "admin"];

export default function UserRoleSelect({
  userId,
  currentRole,
  onUpdated,
}: {
  userId: string;
  currentRole: UserRole;
  onUpdated: (newRole: UserRole) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as UserRole;
    setLoading(true);
    try {
      await updateUserRole(userId, newRole);
      toast.success("Role updated");
      onUpdated(newRole);
    } catch {
      toast.error("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={currentRole}
      onChange={handleChange}
      disabled={loading}
      className="rounded-md border border-input bg-background px-2 py-1 text-xs capitalize text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
    >
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
}
