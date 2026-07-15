import PrivateRoute from "@/components/shared/PrivateRoute";

export default function SupporterHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute allowedRoles={["supporter"]}>{children}</PrivateRoute>;
}
