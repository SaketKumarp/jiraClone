import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

const workSpaceId = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <div>workSpaceId : </div>;
};

export default workSpaceId;
