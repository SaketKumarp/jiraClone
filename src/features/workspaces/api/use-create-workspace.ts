import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkSpace = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces["$post"]({ form }); // this will hit the back-end via hook that we will be using in the client
      return await response.json();
    },

    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["workspace"] });
      // this actually clears cache for react-query and refetches the use-current hook
    },
  });

  return mutation;
};
