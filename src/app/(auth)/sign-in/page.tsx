import { Signin } from "@/features/auth/components/Signin";
import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");

  return <Signin />;
};

export default SigninPage;
