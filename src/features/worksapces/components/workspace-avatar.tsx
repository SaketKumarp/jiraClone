import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WorkSpaceAvatarProps {
  image: string;
  name: string;
  className?: string;
}
export const WorkSpaceAvatar = ({
  image,
  name,
  className,
}: WorkSpaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn(
          "size-10 relative rounded-md overflow-hidden ",
          className
        )}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  } else {
    return (
      <Avatar className={cn("size-10 rounded-md", className)}>
        <AvatarFallback
          className={"text-white bg-[#8e44ad] font-semibol text-lg uppercase"}
        >
          {name[0]}
        </AvatarFallback>
      </Avatar>
    );
  }
};
