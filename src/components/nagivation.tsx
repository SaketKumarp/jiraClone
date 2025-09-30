import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
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
    label: "settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "MY Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },

  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.icon : item.activeIcon;

        return (
          <Link key={item.href} href={item.href}>
            <div>
              <Icon className="size-5 text-neutral-500s" />
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
