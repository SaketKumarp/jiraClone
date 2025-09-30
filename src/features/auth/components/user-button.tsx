"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrent } from "../api/use-current";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";

import { LogOut } from "lucide-react";
import { useLogout } from "../api/use-logout";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const { data: user } = useCurrent();

  if (!user) {
    return null;
  }

  const { name, email } = user;

  const avatarfallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toLocaleUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-15 hover:opacity-75 transition border border-neutral-300 ">
          <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center  ">
            {avatarfallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-100"
        align="end"
        side="bottom"
        sideOffset={10}
      >
        {" "}
        <div className="flex flex-col items-center justify-center gap-2 px-2 py-4">
          <Avatar className="size-15 hover:opacity-75 transition border border-neutral-300 ">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center  ">
              {avatarfallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 p-1">
            {" "}
            <p className="text-sm text-neutral-600">{name || "u"}</p>
            <p className="text-sm text-neutral-600">{email}</p>
          </div>

          <DottedSeparator />
          <DropdownMenuItem
            className="flex justify-center items-center h-10 cursor-pointer text-red-400 font-medium"
            onClick={() =>
              logout(
                {},
                {
                  onSuccess: () => {
                    router.replace("/sign-in");
                  },
                }
              )
            }
          >
            <LogOut className="size-4 text-red-400 " />
            logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
