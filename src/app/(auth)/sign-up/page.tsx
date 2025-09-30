import { Signup } from "@/features/auth/components/Signup";
import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

const signupPage = async () => {
  const user = await getCurrent();
  if (user) redirect("/");

  return <Signup />;
};

export default signupPage;
