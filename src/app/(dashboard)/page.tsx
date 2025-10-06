import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

import { CreateWorkSpaceForm } from "@/features/worksapces/components/create-workspace-form";

export default async function Home() {
  const user = await getCurrent();
  if (!user) return redirect("/sign-in"); // so instead of using middleware i am using other way to protect my routes

  return (
    <div>
      <CreateWorkSpaceForm />
    </div>
  );
}
