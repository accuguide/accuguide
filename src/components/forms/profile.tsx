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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { changeName } from "@/lib/auth-client";
import { useEffect } from "react";

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

  useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        form.reset({
          username: data.user?.name ?? "",
          image: null,
        });
      });
  }, []);

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
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Profile Settings</CardTitle>
        <CardDescription>
          Update your profile information and customize your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
                          onChange={(e) => field.onChange(e.target.files?.[0])}
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
  );
}
