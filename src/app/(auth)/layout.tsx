import { Button } from "@/components/ui/button";
import { MyCard } from "@/myComponents/Mycard";

import Image from "next/image";

interface authLayoutProps {
  children: React.ReactNode;
}

const authLayout = ({ children }: authLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex  justify-between items-center">
          <Image src="./logo.svg" alt="logo" height={100} width={100} />

          <div className="flex items-center gap-2">
            <Button variant={"secondary"}>Sign up</Button>
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
