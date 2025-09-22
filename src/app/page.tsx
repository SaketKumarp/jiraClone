import { createAdminClient } from "@/lib/appwrite";

export default function Home() {
  console.log(createAdminClient);
  return (
    <div className="flex min-h-screen justify-center items-center ">
      <p className="text-white">hi</p>
    </div>
  );
}
