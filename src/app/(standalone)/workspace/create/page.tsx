import { getCurrent } from "@/features/auth/server/actions";
import { CreateWorkSpaceForm } from "@/features/worksapces/components/create-workspace-form";
import { redirect } from "next/navigation";

const WorkspaceCreate = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-col min-h-screen items-center ">
      <CreateWorkSpaceForm />
    </div>
  );
};

export default WorkspaceCreate;
