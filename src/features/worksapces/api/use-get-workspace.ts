import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
export const useGetWorkspace = () => {
  const query = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => {
      const response = await client.api.workspaces.$get(); //  this is client-side datafetching i guess

      if (!response.ok) {
        throw new Error("failed to fethc the workspaces !");
      }
      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
