import { UserButton } from "@/features/auth/components/user-button";
import { getCurrent } from "@/features/auth/server/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) return redirect("/sign-in");

  return (
    <div className="flex min-h-screen justify-center items-center ">
      <UserButton />
    </div>
  );
}
