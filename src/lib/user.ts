import { authClient } from "./auth-client";

export async function changeName(name: string) {
  await authClient.updateUser({
    name,
  });
}
