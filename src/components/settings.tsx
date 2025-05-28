import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateUserName, updatePictureUrl } from "@/lib/user";
import { checkAuthRedirect } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfilePicturePreview } from "./profile-picture-preview";

export type SettingsProps = {
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    googleId: string;
    admin: boolean;
  } | null;
};

export default async function Settings({ user }: SettingsProps) {
  await checkAuthRedirect();

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const username = formData.get("username") as string;
    const pictureUrl = formData.get("pictureUrl") as string;

    if (user?.googleId) {
      await updateUserName(user.googleId, username);
      await updatePictureUrl(user.googleId, pictureUrl);
      redirect("/settings");
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your profile information and customize your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
              <ProfilePicturePreview pictureUrl={user?.picture || ""} />

              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pictureUrl">Profile Picture URL</Label>
                  <Input
                    type="text"
                    id="pictureUrl"
                    name="pictureUrl"
                    defaultValue={user?.picture || ""}
                    placeholder="https://example.com/your-image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a URL to an image for your profile picture
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    defaultValue={user?.name || ""}
                    placeholder="Your display name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your email address is managed by your Google account
                  </p>
                </div>
              </div>
            </div>

            <CardFooter className="flex justify-end px-0 pt-4">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
