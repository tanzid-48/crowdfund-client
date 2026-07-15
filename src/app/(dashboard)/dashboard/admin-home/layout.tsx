import PrivateRoute from "@/components/shared/PrivateRoute";

export default function AdminHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute allowedRoles={["admin"]}>{children}</PrivateRoute>;
}
