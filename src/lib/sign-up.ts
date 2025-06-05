import { authClient } from "@/lib/auth-client"; //import the auth client

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  image?: string,
) {
  await authClient.signUp.email(
    {
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
      image, // User image URL (optional)
      callbackURL: "/profile/", // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: () => {
        //show loading
      },
      onSuccess: () => {
        //redirect to the dashboard or sign in page
        window.location.href = "/profile/";
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    },
  );
}
