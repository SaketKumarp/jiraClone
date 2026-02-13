import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";
interface workspaceIdSettingsPagePorps {}

const workspaceIdSettingsPage = async ({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) => {
  const { slug } = await params;
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <div>workspaceIdSettingsPage{slug}</div>;
};

export default workspaceIdSettingsPage;
