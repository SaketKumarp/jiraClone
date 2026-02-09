"use client";
import { ResposiveModal } from "@/components/responsiveModal";
import { CreateWorkSpaceForm } from "./create-workspace-form";

export const CreateWorkSpaceModal = () => {
  return (
    <ResposiveModal open={true} onOpen={() => {}}>
      <CreateWorkSpaceForm />
    </ResposiveModal>
  );
};
