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
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";

interface createWorkspaceprops {
  onCancel: () => void;
}

export const CreateWorkSpaceForm = () => {
  const form = useForm<z.infer<typeof createWorkSpaceShema>>({
    resolver: zodResolver(createWorkSpaceShema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (values: z.infer<typeof createWorkSpaceShema>) => {
    console.log({ values });
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
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="name of worksapce"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
