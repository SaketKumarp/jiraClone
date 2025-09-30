import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-full h-full bg-neutral-100 p-4">
      <Link href={"/"}>
        <Image alt="logo" src={"/logo.svg"} height={100} width={150} />
      </Link>
      <DottedSeparator />
      <Navigation />
    </aside>
  );
};
