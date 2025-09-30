"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema";
import { useRegister } from "../api/use-register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Signup = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending } = useRegister();

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register(
      { json: values },
      {
        onSuccess: () => {
          router.replace("/");
          toast("account created !", {
            description: "welcome !",
          });
        },
        onError: () => {
          toast("Registration failed !");
        },
      }
    );
  };

  return (
    <Card className="w-full h-full md:w-[487px]  border-none shadow-md">
      <CardHeader className="flex flex-col items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Create Account!</CardTitle>
        <CardDescription>
          By Signin up , you agree to our {""}
          <Link href={"/privacy"}>
            {" "}
            <span className="text-blue-700">Privacy Policy</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="enter your name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"lg"}
              disabled={isPending}
              className="w-full font-bold cursor-pointer"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={isPending}
          variant={"secondary"}
          size={"lg"}
          className="w-full font-bold cursor-pointer"
        >
          <FcGoogle /> Login with Google
        </Button>
        <Button
          disabled={isPending}
          variant={"secondary"}
          size={"lg"}
          className="w-full font-bold cursor-pointer"
        >
          <FaGithub />
          Login with Github
        </Button>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-2 flex justify-center items-center">
          <p>
            Already have an account ?
            <Link href={"/sign-in"}>
              <span className="text-blue-800">&nbsp;Login</span>
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
};
