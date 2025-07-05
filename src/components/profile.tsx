"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { changeName } from "@/lib/user";

const formSchema = z.object({
  username: z.string().optional(),
  image: z.any(),
});

export default function Profile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      image: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.username) await changeName(values.username);
    if (values.image) {
      const formData = new FormData();
      formData.append("image", values.image);
      await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
    }
    window.location.reload();
  }

  return (
    <div className="flex min-h-[75svh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Profile Settings</CardTitle>
              <CardDescription>
                Update your profile information and customize your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6"
                >
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Image</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  field.onChange(e.target.files?.[0])
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
