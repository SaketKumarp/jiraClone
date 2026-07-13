import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";
import { useWorkspaceId } from "../hooks/use-worksapceId";

const workSpaceId = async ({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) => {
  const user = await getCurrent();
  console.log(user?.name);
  if (!user) redirect("/sign-in");

  return <div>workSpaceId : {(await params).workspaceId}</div>;
};

export default workSpaceId;
