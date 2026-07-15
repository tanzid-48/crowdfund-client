"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  campaignSchema,
  type CampaignFormValues,
} from "@/schemas/campaign.schema";
import { createCampaign } from "@/lib/action/campaigns";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUp, Loader2 } from "lucide-react";

const categories = [
  "Education",
  "Technology",
  "Arts & Design",
  "Community & Charity",
  "Sports",
  "Events",
];

export default function AddCampaignForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
  });

  const imageUrl = watch("campaign_image_url");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await res.json();

      if (data.secure_url) {
        setValue("campaign_image_url", data.secure_url, {
          shouldValidate: true,
        });
        setImagePreview(data.secure_url);
        toast.success("Image uploaded");
      } else {
        toast.error("Image upload failed");
      }
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  const onSubmit = async (values: CampaignFormValues) => {
    if (!user) return;

    setLoading(true);
    try {
      await createCampaign({
        ...values,
        creator_name: user.name,
        creator_email: user.email,
      });
      toast.success("Campaign submitted for approval!");
      router.push("/dashboard/creator-home/my-campaigns");
    } catch {
      toast.error("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-5">
      <div className="space-y-2">
        <Label htmlFor="campaign_title">Campaign Title</Label>
        <Input
          id="campaign_title"
          placeholder="e.g. Robotics Club Regional Fund"
          {...register("campaign_title")}
        />
        {errors.campaign_title && (
          <p className="text-xs text-destructive">
            {errors.campaign_title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="campaign_story">Campaign Story</Label>
        <textarea
          id="campaign_story"
          rows={6}
          placeholder="Tell supporters why this campaign matters..."
          className="w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          {...register("campaign_story")}
        />
        {errors.campaign_story && (
          <p className="text-xs text-destructive">
            {errors.campaign_story.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            {...register("category")}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" type="date" {...register("deadline")} />
          {errors.deadline && (
            <p className="text-xs text-destructive">
              {errors.deadline.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="funding_goal">Funding Goal (credits)</Label>
          <Input
            id="funding_goal"
            type="number"
            placeholder="e.g. 500"
            {...register("funding_goal", { valueAsNumber: true })}
          />
          {errors.funding_goal && (
            <p className="text-xs text-destructive">
              {errors.funding_goal.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="minimum_contribution">
            Minimum Contribution (credits)
          </Label>
          <Input
            id="minimum_contribution"
            type="number"
            placeholder="e.g. 10"
            {...register("minimum_contribution", { valueAsNumber: true })}
          />
          {errors.minimum_contribution && (
            <p className="text-xs text-destructive">
              {errors.minimum_contribution.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reward_info">Reward Info (optional)</Label>
        <Input
          id="reward_info"
          placeholder="What supporters get in return"
          {...register("reward_info")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="campaign_image">Campaign Image</Label>
        <div className="flex items-center gap-4">
          <label
            htmlFor="campaign_image"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary"
          >
            {uploading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <ImageUp size={18} />
            )}
            {uploading ? "Uploading..." : "Upload image"}
          </label>
          <input
            id="campaign_image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          {imagePreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt="Preview"
              className="h-14 w-14 rounded-md object-cover"
            />
          )}
        </div>
        {errors.campaign_image_url && (
          <p className="text-xs text-destructive">
            {errors.campaign_image_url.message}
          </p>
        )}
        <input
          type="hidden"
          {...register("campaign_image_url")}
          value={imageUrl || ""}
          readOnly
        />
      </div>

      <Button
        type="submit"
        disabled={loading || uploading}
        className="w-full sm:w-auto"
      >
        {loading ? "Submitting..." : "Submit Campaign for Approval"}
      </Button>
    </form>
  );
}
