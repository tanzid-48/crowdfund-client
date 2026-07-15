import type { Campaign } from "@/types";

export async function getTopFundedCampaigns(): Promise<Campaign[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/campaigns/top-funded`,
      {
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
