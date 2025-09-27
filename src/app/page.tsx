"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();

  const { mutate } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return (
    <div className="flex min-h-screen justify-center items-center ">
      <p className="text-white">
        hey this is : {data?.name} and {data?.email}{" "}
        <Button variant={"destructive"} onClick={() => mutate()}>
          logout
        </Button>
      </p>
    </div>
  );
}
