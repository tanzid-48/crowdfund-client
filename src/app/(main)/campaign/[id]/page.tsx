import Image from "next/image";
import { notFound } from "next/navigation";
import { getCampaignById } from "@/lib/api/campaigns";
import ContributeForm from "@/components/campaign/ContributeForm";

function fundedPercent(raised: number, goal: number) {
  if (!goal) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

function daysLeft(deadline: string | Date) {
  const diff = new Date(deadline).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

export default async function CampaignDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = await getCampaignById(id);

  if (!campaign) {
    notFound();
  }

  const percent = fundedPercent(campaign.amount_raised, campaign.funding_goal);
  const remaining = daysLeft(campaign.deadline);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
            <Image
              src={campaign.campaign_image_url}
              alt={campaign.campaign_title}
              fill
              className="object-cover"
              priority
            />
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {campaign.category}
            </span>
          </div>

          <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
            {campaign.campaign_title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            by {campaign.creator_name}
          </p>

          <div className="prose prose-sm mt-6 max-w-none text-foreground">
            <p className="whitespace-pre-line leading-relaxed">
              {campaign.campaign_story}
            </p>
          </div>

          {campaign.reward_info && (
            <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-5">
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Reward
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {campaign.reward_info}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-primary">
                {percent}%
              </span>
              <span className="text-sm text-muted-foreground">funded</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4">
              <div>
                <p className="font-mono text-lg font-semibold text-foreground">
                  ${campaign.amount_raised.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  raised of ${campaign.funding_goal.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold text-foreground">
                  {remaining}
                </p>
                <p className="text-xs text-muted-foreground">
                  {remaining === 1 ? "day left" : "days left"}
                </p>
              </div>
            </div>
          </div>

          <ContributeForm campaign={campaign} />
        </div>
      </div>
    </div>
  );
}
