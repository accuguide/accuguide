import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({});

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  await authClient.changePassword({
    newPassword,
    currentPassword,
    revokeOtherSessions: true,
  });
}

export async function changeEmail(email: string) {
  await authClient.changeEmail({
    newEmail: email,
    callbackURL: "/settings/account/",
  });
}

export async function requestPassWordReset(email: string) {
  await authClient.requestPasswordReset({
    email: email,
    redirectTo: "/sign-in/password/reset/",
  });
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await authClient.signIn.email(
    {
      email,
      password,
      callbackURL: "/settings/profile/",
      rememberMe: false,
    },
    {},
  );
  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/settings/profile/",
  });
  return { data, error };
}

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
      callbackURL: "/settings/profile/", // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: () => {
        //show loading
      },
      onSuccess: () => {
        //redirect to the dashboard or sign in page
        window.location.href = "/settings/profile/";
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    },
  );
}

export async function changeName(name: string) {
  await authClient.updateUser({
    name,
  });
}
