import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });
      return await response.json();
    },

    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["current"] });
      // this actually clears cache for react-query and refetches the use-current hook
    },
  });

  return mutation;
};
