import AddCampaignForm from "@/components/dashboard/creator/AddCampaignForm";

export default function AddCampaignPage() {
  return (
    <div className="text-center">
      <h1 className="font-heading text-2xl  font-bold text-foreground">
        Add New Campaign
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your campaign will be reviewed by an admin before it goes live.
      </p>
      <div className="mt-6">
        <AddCampaignForm />
      </div>
    </div>
  );
}
