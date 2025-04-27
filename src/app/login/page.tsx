import Login from "@/components/login";

export default async function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1>Sign In</h1>
      <br />
      <Login>Sign In With Google</Login>
    </div>
  );
}
