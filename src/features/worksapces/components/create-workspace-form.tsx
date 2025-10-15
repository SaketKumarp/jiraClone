"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkSpaceShema } from "../schema";
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
import { useCreateWorkSpace } from "../api/use-create-workspace";

interface createWorkspaceprops {
  onCancel?: () => void;
}

export const CreateWorkSpaceForm = ({ onCancel }: createWorkspaceprops) => {
  const { mutate, isPending } = useCreateWorkSpace();

  const form = useForm<z.infer<typeof createWorkSpaceShema>>({
    resolver: zodResolver(createWorkSpaceShema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (values: z.infer<typeof createWorkSpaceShema>) => {
    console.log({ values });
    mutate({ json: values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-md ">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xls">Create Workspace</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input placeholder="name of worksapce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size={"lg"}
                variant={"secondary"}
                onClick={onCancel}
                disabled={isPending}
              >
                cancel
              </Button>
              <Button
                type="submit"
                size={"lg"}
                variant={"default"}
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
