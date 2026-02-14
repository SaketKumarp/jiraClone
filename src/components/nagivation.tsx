"use client";

import { useWorkspaceId } from "@/app/(dashboard)/workspace/hooks/use-worksapceId";
import { cn } from "@/lib/utils";
import { Route, Settings, SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

const routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },

  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: Settings,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];
export const Navigation = () => {
  const pathname = usePathname();
  const workspaceId = useWorkspaceId();

  return (
    <ul className="flex flex-col gap-1 px-2">
      {routes.map((item) => {
        const route = `${workspaceId}${item.href}`;
        const isActive = pathname === route;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <li key={item.href}>
            <Link
              href={route}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "text-neutral-500 hover:text-neutral-900",
                "hover:bg-neutral-100",
                isActive &&
                  "bg-white text-primary shadow-sm ring-1 ring-neutral-200",
              )}
            >
              {isActive && (
                <span className="absolute left-0 h-5 w-1 rounded-r-full bg-primary" />
              )}

              <Icon
                className={cn(
                  "size-5 transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-neutral-400 group-hover:text-neutral-700",
                )}
              />

              <span className="tracking-tight">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
