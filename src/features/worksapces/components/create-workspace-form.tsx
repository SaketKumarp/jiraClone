"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import { createWorkSpaceShema } from "@/features/auth/schema";
import { useRouter } from "next/navigation";

interface CreateWorkspaceProps {
  onCancel?: () => void;
}

export const CreateWorkSpaceForm = ({ onCancel }: CreateWorkspaceProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useCreateWorkSpace();
  const router = useRouter();

  const form = useForm<z.infer<typeof createWorkSpaceShema>>({
    resolver: zodResolver(createWorkSpaceShema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkSpaceShema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          toast.success("Workspace created!");
          form.reset();
          router.push(`/workspace/${data.$id}`);
        },
      },
    );
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      const file = form.getValues("image");
      if (file instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    };
  }, [form]);

  return (
    <Card
      className="
        w-full 
        md:w-[480px] 
        rounded-2xl 
        border 
        border-neutral-200 
        bg-white 
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]
      "
    >
      {/* Header */}
      <CardHeader className="text-center p-8 pb-4">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Create Workspace
        </CardTitle>
        <p className="text-sm text-neutral-500 mt-1">
          Set up a new workspace to manage your projects
        </p>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Workspace Name */}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Workspace Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter workspace name"
                      disabled={isPending}
                      className="
                        h-11 
                        rounded-xl 
                        border-neutral-200 
                        focus-visible:ring-2 
                        focus-visible:ring-primary/30
                      "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Workspace Image */}
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Workspace Icon
                  </FormLabel>

                  <div className="flex items-center gap-5">
                    {field.value ? (
                      <div className="relative size-[72px] overflow-hidden rounded-xl border border-neutral-200">
                        <Image
                          fill
                          className="object-cover"
                          alt="workspace image"
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                        />
                      </div>
                    ) : (
                      <Avatar className="size-[72px] rounded-xl border border-neutral-200 bg-neutral-50">
                        <AvatarFallback>
                          <ImageIcon className="size-8 text-neutral-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex flex-col">
                      <p className="text-xs text-neutral-500">
                        JPG, PNG, SVG — Max 1MB
                      </p>

                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg"
                        className="hidden"
                        ref={inputRef}
                        disabled={isPending}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          if (file.size > 1024 * 1024) {
                            toast.error("File too large! Max 1MB allowed.");
                            return;
                          }

                          field.onChange(file);
                        }}
                      />

                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => inputRef.current?.click()}
                        className="
                          mt-3 
                          rounded-lg 
                          border-neutral-200 
                          hover:bg-neutral-100
                        "
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <div
              className={cn(
                "flex items-center pt-2",
                onCancel ? "justify-between" : "justify-center",
              )}
            >
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="
                  h-11 
                  px-6 
                  rounded-xl 
                  bg-primary 
                  text-white 
                  shadow-sm 
                  hover:opacity-90 
                  transition
                "
              >
                {isPending ? "Creating..." : "Create Workspace"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
