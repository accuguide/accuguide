"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { requestPassWordReset } from "@/lib/forgot-password";

const formSchema = z.object({
  email: z.string().email(),
});

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      await requestPassWordReset(values.email);
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
              <CardTitle className="text-xl">Forgot your password?</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center text-green-600 dark:text-green-400">
                  If an account with that email exists, a password reset link
                  has been sent.
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="name@example.com"
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
                      Send reset link
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
