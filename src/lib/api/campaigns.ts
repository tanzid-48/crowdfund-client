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

export async function getAllApprovedCampaigns(
  category?: string,
): Promise<Campaign[]> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`);
    if (category) url.searchParams.set("category", category);

    const res = await fetch(url.toString(), { next: { revalidate: 30 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`,
      {
        cache: "no-store", // details page  always fresh data
      },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
