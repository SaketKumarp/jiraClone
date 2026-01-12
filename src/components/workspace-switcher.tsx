"use client";

import { useGetWorkspace } from "@/features/worksapces/api/use-get-workspace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { WorkSpaceAvatar } from "@/features/worksapces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/app/(dashboard)/workspace/hooks/use-worksapceId";

export const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace();
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const onSelect = (id: string) => {
    router.push(`/workspace/${id}`);
  };
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase bg-neutral-500 ">worksapces</p>
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-300 font-medium p-1 ">
          <SelectValue placeholder="no workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((worksapce) => (
            <SelectItem key={worksapce.$id} value={worksapce.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkSpaceAvatar
                  name={worksapce.name}
                  image={worksapce.imageUrl}
                />
                <span className="truncate">{worksapce.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
