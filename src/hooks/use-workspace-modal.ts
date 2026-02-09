import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateWorkspaceModal = () => {
  const [isopen, setIsopen] = useQueryState(
    "create-workspace",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsopen(true);
  const close = () => setIsopen(false);
  return {
    open,
    close,
    isopen,
    setIsopen,
  };
};
