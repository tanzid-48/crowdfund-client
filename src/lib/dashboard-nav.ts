import type { UserRole } from "@/types";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Wallet,
  History,
  CheckCircle,
  Compass,
  CreditCard,
  Users,
  FolderCog,
  Flag,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardNav: Record<UserRole, NavItem[]> = {
  creator: [
    { label: "Home", href: "/dashboard/creator-home", icon: LayoutDashboard },
    {
      label: "Contributions to Review",
      href: "/dashboard/creator-home/contributions",
      icon: FileText,
    },
    {
      label: "Add New Campaign",
      href: "/dashboard/creator-home/add-campaign",
      icon: PlusCircle,
    },
    {
      label: "My Campaigns",
      href: "/dashboard/creator-home/my-campaigns",
      icon: FolderCog,
    },
    {
      label: "Withdrawals",
      href: "/dashboard/creator-home/withdrawals",
      icon: Wallet,
    },
    {
      label: "Payment History",
      href: "/dashboard/creator-home/payment-history",
      icon: History,
    },
  ],
  supporter: [
    { label: "Home", href: "/dashboard/supporter-home", icon: LayoutDashboard },
    {
      label: "Approved Contributions",
      href: "/dashboard/supporter-home/approved",
      icon: CheckCircle,
    },
    {
      label: "Explore Campaigns",
      href: "/dashboard/supporter-home/explore",
      icon: Compass,
    },
    {
      label: "My Contributions",
      href: "/dashboard/supporter-home/my-contributions",
      icon: FileText,
    },
    {
      label: "Purchase Credit",
      href: "/dashboard/supporter-home/purchase-credit",
      icon: CreditCard,
    },
    {
      label: "Payment History",
      href: "/dashboard/supporter-home/payment-history",
      icon: History,
    },
  ],
  admin: [
    { label: "Home", href: "/dashboard/admin-home", icon: LayoutDashboard },
    {
      label: "Campaign Approvals",
      href: "/dashboard/admin-home/approvals",
      icon: CheckCircle,
    },
    {
      label: "Withdrawal Requests",
      href: "/dashboard/admin-home/withdrawal-requests",
      icon: Wallet,
    },
    { label: "Manage Users", href: "/dashboard/admin-home/users", icon: Users },
    {
      label: "Manage Campaigns",
      href: "/dashboard/admin-home/campaigns",
      icon: FolderCog,
    },
    { label: "Reports", href: "/dashboard/admin-home/reports", icon: Flag },
  ],
};
