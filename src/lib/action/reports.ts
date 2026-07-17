import axiosInstance from "@/lib/api/axiosInstance";

export async function suspendReportedCampaign(reportId: string) {
  const res = await axiosInstance.patch(`/reports/${reportId}/suspend`);
  return res.data;
}

export async function dismissReport(reportId: string) {
  const res = await axiosInstance.patch(`/reports/${reportId}/dismiss`);
  return res.data;
}
