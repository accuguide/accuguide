import { authClient } from "@/lib/auth-client"; //import the auth client

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await authClient.signIn.email(
    {
      /**
       * The user email
       */
      email,
      /**
       * The user password
       */
      password,
      /**
       * A URL to redirect to after the user verifies their email (optional)
       */
      callbackURL: "/profile/",
      /**
       * remember the user session after the browser is closed.
       * @default true
       */
      rememberMe: false,
    },
    {
      //callbacks
    },
  );
  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/profile/",
  });
  return { data, error };
}
