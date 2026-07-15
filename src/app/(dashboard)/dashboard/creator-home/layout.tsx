import PrivateRoute from "@/components/shared/PrivateRoute";

export default function CreatorHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateRoute allowedRoles={["creator"]}>{children}</PrivateRoute>;
}
