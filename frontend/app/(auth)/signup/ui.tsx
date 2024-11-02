"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUp } from "./actions";
import { Loader2 } from "lucide-react";
import { showErrorToast } from "@/lib/handle-error";

const formSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(8),
    cpassword: z.string().trim().min(8),
  })
  .refine(({ cpassword, password }) => password === cpassword, {
    message: "Password don't match",
    path: ["cpassword"],
  });

export default function SignInUI() {
  const [loading, setLoading] = useState(false);
  const [emailVerification, setEmailVerification] = useState<
    undefined | string
  >(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { email: "", password: "", cpassword: "" },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await signUp({ email: data.email, password: data.password });
      if (res.error) throw res.error;
      setEmailVerification(data.email);
    } catch (error: unknown) {
      setLoading(false);
      showErrorToast(error, "Failed to sign up");
    }
  };

  if (emailVerification) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
        <div className="max-w-xl px-5 text-center">
          <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
            Check your inbox, (Currently verification step not working just
            directly go to login)
          </h2>
          <p className="mb-2 text-lg text-zinc-500">
            We are glad, that you’re with us ? We’ve sent you a verification
            link to the email address{" "}
            <span className="font-medium text-indigo-500">
              {emailVerification}
            </span>
            .
          </p>
          <Link
            href="/signin"
            className="mt-3 inline-block w-96 rounded bg-primary px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20"
          >
            Open the App →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="font-normal">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="enter email.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="font-normal">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="font-normal">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up
                </Button>
              </form>
              <p className="text-sm mt-4">
                Already have and account &nbsp;
                <Link
                  href="/signin"
                  className="text-blue-500 hover:text-blue-400"
                >
                  sign in
                </Link>
              </p>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
