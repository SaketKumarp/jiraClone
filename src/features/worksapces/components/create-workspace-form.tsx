"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import { createWorkSpaceShema } from "@/features/auth/schema";

// ✅ updated schema (zod)

interface CreateWorkspaceProps {
  onCancel?: () => void;
}

export const CreateWorkSpaceForm = ({ onCancel }: CreateWorkspaceProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useCreateWorkSpace();

  const form = useForm<z.infer<typeof createWorkSpaceShema>>({
    resolver: zodResolver(createWorkSpaceShema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkSpaceShema>) => {
    console.log("Submitting:", values);
    mutate(
      { json: values },
      {
        onSuccess: () => {
          toast.success("Workspace created!");
          form.reset();
        },
      }
    );
  };

  // 🧹 Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      const file = form.getValues("image");
      if (file instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    };
  }, [form]);

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-md">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Create Workspace</CardTitle>
      </CardHeader>

      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              {/* Workspace Name */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter workspace name"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Workspace Image Upload */}
              <FormField
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Icon</FormLabel>
                    <div className="flex items-center gap-x-4">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
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
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[32px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className="flex flex-col">
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, JPEG, or SVG — Max 1 MB
                        </p>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.svg"
                          className="hidden"
                          ref={inputRef}
                          disabled={isPending}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 1024 * 1024) {
                                toast.error(
                                  "File too large! Max 1 MB allowed."
                                );
                                return;
                              }
                              field.onChange(file);
                            }
                          }}
                        />

                        <Button
                          type="button"
                          size="xs"
                          variant="outline"
                          className="w-fit mt-2 bg-blue-300"
                          disabled={isPending}
                          onClick={() => inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DottedSeparator className="py-7" />

            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                variant="default"
                disabled={isPending}
              >
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
