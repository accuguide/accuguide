"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomLink from "@/components/custom-link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
// import { resetPassword } from "@/lib/reset-password"; // implement this in your backend

const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function PasswordResetForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      await authClient.resetPassword({
        newPassword: values.password,
        token,
      });
      setSubmitted(true);
    } catch (e: unknown) {
      let message = "Something went wrong. Please try again.";
      if (
        typeof e === "object" &&
        e &&
        "message" in e &&
        typeof (e as { message?: unknown }).message === "string"
      ) {
        message = (e as { message: string }).message;
      }
      setError(message);
    }
  }

  return (
    <div className="flex min-h-[75svh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Reset your password</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center text-green-600 dark:text-green-400">
                  Your password has been reset. You can now{" "}
                  <CustomLink href="/sign-in/" underline>
                    sign in
                  </CustomLink>{" "}
                  with your new password.
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-6"
                  >
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter new password"
                                required
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {error && (
                      <div className="text-red-600 dark:text-red-400 text-sm text-center">
                        {error}
                      </div>
                    )}
                    <Button type="submit" className="w-full">
                      Reset password
                    </Button>
                  </form>
                </Form>
              )}
              <div className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                <CustomLink href="/sign-in/" underline>
                  Back to sign in
                </CustomLink>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <PasswordResetForm />
    </Suspense>
  );
}
