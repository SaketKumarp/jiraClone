import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-separator";
import { Navigation } from "./nagivation";
import { WorkspaceSwitcher } from "./workspace-switcher";

export const Sidebar = () => {
  return (
    <aside
      className="
    h-screen
    w-72
    flex
    flex-col
    border-r
    border-neutral-200
    bg-[rgba(26,188,156,0.04)]
    px-4
    py-6
  "
    >
      <Link href="/" className="flex items-center justify-start px-2 mb-6">
        <Image
          alt="logo"
          src="/logo.svg"
          height={32}
          width={120}
          className="object-contain"
        />
      </Link>

      
      <div className="px-1">
        <WorkspaceSwitcher />
      </div>

      <div className="my-6 border-t border-neutral-200" />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-1">
        <Navigation />
      </div>
    </aside>
  );
};
