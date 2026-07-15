import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getAllApprovedCampaigns } from "@/lib/api/campaigns";

function fundedPercent(raised: number, goal: number) {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export default async function ExploreCampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const campaigns = await getAllApprovedCampaigns(category);

  return (
    <div className="mx-auto w-11/12 px-4 py-12">
      <div className="mb-10">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Explore Campaigns
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {category
            ? `Showing campaigns in "${category}"`
            : "Discover active campaigns worth backing"}
        </p>
      </div>

      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-24 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Search className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">No campaigns found</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {category
                ? `No active campaigns in this category yet. Check back soon.`
                : `There are no active campaigns right now. Be the first to launch one.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => {
            const percent = fundedPercent(
              campaign.amount_raised,
              campaign.funding_goal,
            );
            return (
              <Link
                key={campaign._id}
                href={`/campaign/${campaign._id}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={campaign.campaign_image_url}
                    alt={campaign.campaign_title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {campaign.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-heading line-clamp-1 text-lg font-semibold text-foreground">
                    {campaign.campaign_title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    by {campaign.creator_name}
                  </p>
                  <div className="mt-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold text-primary">
                        {percent}% funded
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        ${campaign.amount_raised.toLocaleString()} raised
                      </span>
                    </div>

                    <div
                      className="mt-3 flex items-center justify-end
                     gap-1 text-xs font-medium text-primary opacity-0 transition-opacity opacity-100"
                    >
                      View Details
                      <span aria-hidden>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
