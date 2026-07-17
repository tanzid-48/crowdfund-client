"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { updateOwnProfile } from "@/lib/action/users";
import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "@/components/shared/Loading";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const updateUserInStore = useUserStore((state) => state.setUser);
  const [name, setName] = useState(user?.name ?? "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [saving, setSaving] = useState(false);

  if (loading) return <Loading />;
  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateOwnProfile({ name, image: photoURL });
      updateUserInStore({ ...user, name, photoURL });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        My Profile
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your account information
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Avatar className="h-20 w-20 border border-border">
          <AvatarImage src={photoURL || undefined} alt={name} />
          <AvatarFallback className="text-xl">
            {name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">
            {user.name}
          </p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className="mt-1 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
            {user.role}
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Available Credits</p>
          <p className="mt-1 font-mono text-2xl font-bold text-primary">
            {user.credits}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Account Type</p>
          <p className="mt-1 font-heading text-lg font-semibold capitalize text-foreground">
            {user.role}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
        <h2 className="font-heading text-sm font-semibold text-foreground">
          Edit Profile
        </h2>

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photoURL">Profile photo URL</Label>
          <Input
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
