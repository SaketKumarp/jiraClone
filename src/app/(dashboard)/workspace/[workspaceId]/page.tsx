"use client";

import { useParams } from "next/navigation";

const workSpaceId = () => {
  const param = useParams<{ workspaceId: string }>();

  return <div>workSpaceId : {param.workspaceId}</div>;
};

export default workSpaceId;
