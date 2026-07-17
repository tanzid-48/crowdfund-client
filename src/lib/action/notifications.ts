import axiosInstance from "@/lib/api/axiosInstance";

export async function markNotificationSeen(id: string) {
  const res = await axiosInstance.patch(`/notifications/${id}/seen`);
  return res.data;
}

export async function markAllSeen(email: string) {
  const res = await axiosInstance.patch("/notifications/mark-all-seen", {
    email,
  });
  return res.data;
}
