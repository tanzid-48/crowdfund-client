import ContributionReviewTable from "@/components/dashboard/creator/ContributionReviewTable";

export default function ContributionsPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Contributions to Review
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Approve or reject pending contributions to your campaigns
      </p>
      <ContributionReviewTable />
    </div>
  );
}
