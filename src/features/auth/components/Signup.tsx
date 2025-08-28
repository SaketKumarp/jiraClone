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
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const Signup = () => {
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
        <form className="space-y-4">
          <Input
            required
            placeholder="enter your name"
            value={""}
            onChange={() => {}}
            disabled={false}
            type="text"
          />
          <Input
            required
            placeholder="enter your email"
            value={""}
            onChange={() => {}}
            disabled={false}
            type="email"
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
            Sign-Up
          </Button>
        </form>
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
