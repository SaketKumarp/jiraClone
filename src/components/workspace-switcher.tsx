"use client";

import { useGetWorkspace } from "@/features/worksapces/api/use-get-workspace";

export const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase bg-neutral-500 ">worksapces</p>
      </div>
    </div>
  );
};
// i have to make worksapce switcher
