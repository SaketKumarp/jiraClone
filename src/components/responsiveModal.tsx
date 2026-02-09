import { useMedia } from "react-use";
import { Dialog, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

interface responsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpen: (open: boolean) => void;
}

export const ResposiveModal = ({
  open,
  onOpen,
  children,
}: responsiveModalProps) => {
  const isDesktop = useMedia("(min-width : 1024px)", true);
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpen}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh] ">
          {children}
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={onOpen}>
        <DrawerContent>
          <div className=" overflow-y-auto hide-scrollbar max-h-[85vh] ">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
};
