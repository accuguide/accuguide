import Login from "@/components/login";
import Title from "@/components/title";

export default async function Page() {
  return (
    <div>
      <Title>Login</Title>
      <br />
      <Login>Sign In With Google</Login>
    </div>
  );
}
