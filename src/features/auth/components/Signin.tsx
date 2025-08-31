"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { create } from "domain";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export const Signin = () => {
  const formSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="w-full h-full md:w-[487px]  border-none shadow-md">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome Back !</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="enter your email"
                    type="email"
                    {...field}
                  />
                  ;
                </FormItem>
              )}
            />

            <Input
              required
              placeholder="enter password"
              value={""}
              onChange={() => {}}
              disabled={false}
              type="password"
              min={3}
              max={256}
            />
            <Button size={"lg"} disabled={false} className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FcGoogle /> Login with Google
        </Button>
        <Button
          disabled={false}
          variant={"secondary"}
          size={"lg"}
          className="w-full"
        >
          <FaGithub />
          Login with Github
        </Button>
      </CardContent>
    </Card>
  );
};
