import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";
import { getCurrentWorksapce } from "./workspace/action";

export default async function Home() {
  const user = await getCurrent();
  if (!user) return redirect("/sign-in");

  const workspace = await getCurrentWorksapce();
  if (!workspace) {
    return redirect("/worksapace/create");
  } else {
    redirect(`/workspace/${workspace.data.documents[0].$id}`); // we will redirect directly into the first workspace of the appwrite
  }
}
