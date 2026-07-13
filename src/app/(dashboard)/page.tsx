import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";
import { getCurrentWorkspaces } from "./workspace/action";

export default async function Home() {
  const user = await getCurrent();
  if (!user) return redirect("/sign-in");

  const workspace = await getCurrentWorkspaces();
  if (!workspace) {
    return redirect("/workspace/create");
  } else {
    redirect(`/workspace/${workspace.data.documents[0].$id}`);
  }
}
