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
import { RiAddCircleFill } from "react-icons/ri";
import { useCreateWorkspaceModal } from "@/hooks/use-create-workspace-modal";

export const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspaceModal();

  const onSelect = (id: string) => {
    router.push(`/workspace/${id}`);
  };

  return (
    <div className="flex flex-col gap-3 px-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
          Workspaces
        </p>

        <button
          onClick={open}
          className="group flex items-center justify-center rounded-lg p-1.5 transition-all hover:bg-neutral-200"
        >
          <RiAddCircleFill className="size-5 text-neutral-400 transition-colors group-hover:text-primary" />
        </button>
      </div>

      {/* Select */}
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger
          className="
            w-full 
            rounded-xl 
            border 
            border-neutral-200 
            bg-white/80 
            backdrop-blur 
            px-3 
            py-2 
            text-sm 
            font-medium 
            shadow-sm 
            transition-all 
            hover:border-neutral-300
            focus:ring-2 
            focus:ring-primary/30
          "
        >
          <SelectValue placeholder="Select workspace" />
        </SelectTrigger>

        <SelectContent className="rounded-xl border border-neutral-200 shadow-lg">
          {workspaces?.documents.map((workspace) => (
            <SelectItem
              key={workspace.$id}
              value={workspace.$id}
              className="rounded-lg px-3 py-2 focus:bg-neutral-100"
            >
              <div className="flex items-center gap-3">
                <WorkSpaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className="truncate text-sm font-medium">
                  {workspace.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
