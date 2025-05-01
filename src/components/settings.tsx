import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { updateUserName } from "@/lib/user";

export type SettingsProps = {
  user: {
    id: number;
    name: string;
    email: string;
    picture: string;
    googleId: string;
  } | null;
};

export default function Settings({ user }: SettingsProps) {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const username = formData.get("username") as string;
    if (user?.googleId) {
      await updateUserName(user.googleId, username);
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
        <Button type="submit">Save</Button>
      </form>

      <br />
    </div>
  );
}
