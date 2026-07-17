"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllUsers } from "@/lib/api/users";
import UserRoleSelect from "@/components/dashboard/admin/UserRoleSelect";
import RemoveUserDialog from "@/components/dashboard/admin/RemoveUserDialog";
import Loading from "@/components/shared/Loading";
import { Users } from "lucide-react";
import type { User, UserRole } from "@/types";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleUpdate = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
    );
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Manage Users
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        View and manage all platform users
      </p>

      {users.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Users className="text-muted-foreground" size={24} />
          </div>
          <p className="font-medium text-foreground">No users found</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="mt-6 hidden overflow-x-auto rounded-xl border border-border md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase text-muted-foreground">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Credits</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {u.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {u.email}
                    </td>
                    <td className="px-4 py-3 font-mono text-foreground">
                      {u.credits}
                    </td>
                    <td className="px-4 py-3">
                      <UserRoleSelect
                        userId={u._id as string}
                        currentRole={u.role}
                        onUpdated={(newRole) =>
                          handleRoleUpdate(u._id as string, newRole)
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <RemoveUserDialog
                        userId={u._id as string}
                        userName={u.name}
                        onRemoved={fetchUsers}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="mt-6 space-y-3 md:hidden">
            {users.map((u) => (
              <div
                key={u._id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="font-medium text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-sm text-foreground">
                    {u.credits} credits
                  </span>
                  <UserRoleSelect
                    userId={u._id as string}
                    currentRole={u.role}
                    onUpdated={(newRole) =>
                      handleRoleUpdate(u._id as string, newRole)
                    }
                  />
                </div>
                <div className="mt-3">
                  <RemoveUserDialog
                    userId={u._id as string}
                    userName={u.name}
                    onRemoved={fetchUsers}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
