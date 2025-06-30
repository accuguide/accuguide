import { authClient } from "@/lib/auth-client"; //import the auth client

export async function requestPassWordReset(email: string) {
  await authClient.requestPasswordReset({
    email: email,
    redirectTo: "/sign-in/password/reset",
  });
}
