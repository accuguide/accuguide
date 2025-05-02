import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateUserName, updatePictureUrl } from "@/lib/user";
import { checkAuthRedirect } from "@/lib/auth";

export type SettingsProps = {
  user: {
    id: number;
    name: string;
    email: string;
    picture: string;
    googleId: string;
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
    <div>
      <form className="max-w-sm" action={handleSubmit}>
        <Label htmlFor="username" className="mb-2">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          name="username"
          defaultValue={user?.name || ""}
          className="mb-2"
        />

        <Label htmlFor="pictureUrl" className="mb-2">
          Profile Picture URL
        </Label>
        <Input
          type="text"
          id="pictureUrl"
          name="pictureUrl"
          defaultValue={user?.picture || ""}
          className="mb-2"
        />

        <Button type="submit">Save</Button>
      </form>

      <br />
    </div>
  );
}
