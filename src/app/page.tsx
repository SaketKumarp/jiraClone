"use client";

import { useCurrent } from "@/features/auth/api/use-current";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  console.log(data, isLoading);

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return (
    <div className="flex min-h-screen justify-center items-center ">
      <p className="text-white">
        hey this is : {data?.name} and {data?.email}{" "}
      </p>
    </div>
  );
}
