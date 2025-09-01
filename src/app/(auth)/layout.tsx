"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface authLayoutProps {
  children: React.ReactNode;
}

const authLayout = ({ children }: authLayoutProps) => {
  const pathName = usePathname();
  const isSignIn = pathName === "/sign-in";
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex  justify-between items-center">
          <Image src="./logo.svg" alt="logo" height={100} width={100} />

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant={"secondary"}
              className="bg-blue-700 hover:bg-blue-700/80 text-gray-100 font-semibold"
            >
              <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                {isSignIn ? "Sign-up" : "Login"}
              </Link>
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default authLayout;
