import { getCurrentWorkspace } from "@/app/(dashboard)/workspace/action";
import { getCurrent } from "@/features/auth/server/actions";

import { EditWorkspaceform } from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

const workspaceIdSettingsPage = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const { workspaceId } = await params;
  const initialValues = await getCurrentWorkspace(workspaceId);
  if (!initialValues) redirect(`/workspace/${workspaceId}`);
  // due to initial values being null this is redirecting direclty...
  // so u have to debug that
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div>
      <EditWorkspaceform initialValues={initialValues.data} />
    </div>
  );
};

export default workspaceIdSettingsPage;
