"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { login } from "./actions";
import MaxWidthWrapper from "@/components/max-width-wrapper";
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
import { Button } from "@/components/ui/button";
import { showErrorToast } from "@/lib/handle-error";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(8),
  })
  .required();

export default function SignInUI() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await login(data);
      setLoading(false);
      router.replace("/dashboard");
    } catch (error: unknown) {
      setLoading(false);
      showErrorToast(error, "Failed to sign in");
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <FormLabel className="font-normal">Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-1.5">
                        <FormLabel className="font-normal">Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <Link
                    className="pt-2 float-right text-sm"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link> */}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
              <p className="text-sm mt-4">
                Don&apos;t have an account &nbsp;
                <Link
                  href="/signup"
                  className="text-blue-500 hover:text-blue-400"
                >
                  sign up
                </Link>
              </p>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
