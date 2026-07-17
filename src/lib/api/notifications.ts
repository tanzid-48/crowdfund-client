import axiosInstance from "@/lib/api/axiosInstance";
import type { Notification } from "@/types";

export async function getNotifications(email: string): Promise<Notification[]> {
  const res = await axiosInstance.get(`/notifications?email=${email}`);
  return res.data;
}
