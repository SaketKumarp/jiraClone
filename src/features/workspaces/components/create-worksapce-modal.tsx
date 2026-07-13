"use client";
import { ResposiveModal } from "@/components/responsiveModal";
import { CreateWorkSpaceForm } from "./create-workspace-form";
import { useCreateWorkspaceModal } from "@/hooks/use-create-workspace-modal";

export const CreateWorkSpaceModal = () => {
  const { isopen, setIsopen, close } = useCreateWorkspaceModal();
  return (
    <ResposiveModal open={isopen} onOpen={setIsopen}>
      <CreateWorkSpaceForm onCancel={close} />
    </ResposiveModal>
  );
};
