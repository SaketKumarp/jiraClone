import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

const workspaceIdSettingsPage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <div>workspaceIdSettingsPage : {workspaceId}</div>;
};

export default workspaceIdSettingsPage;
