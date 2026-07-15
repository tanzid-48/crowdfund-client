import Link from "next/link";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { getTopFundedCampaigns } from "@/lib/api/campaigns";

function fundedPercent(raised: number, goal: number) {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

export default async function TopFundedCampaigns() {
  const campaigns = await getTopFundedCampaigns();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Top Funded Campaigns
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Campaigns closest to reaching their goal, right now
          </p>
        </div>
        <Link
          href="/explore-campaigns"
          className="hidden text-sm font-medium text-primary hover:underline sm:block"
        >
          View all →
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <TrendingUp className="text-muted-foreground" size={24} />
          </div>
          <div>
            <p className="font-medium text-foreground">No campaigns yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Be the first to launch a campaign and start building momentum on
              Crowdfund.
            </p>
          </div>
          <Link href="/register">
            <button className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Start a Campaign
            </button>
          </Link>
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
                <div className="relative h-44 w-full overflow-hidden">
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
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
