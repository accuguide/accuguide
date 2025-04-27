import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";

export default async function Page() {
	const { user } = await getCurrentSession();
	if (user === null) {
		return redirect("/login");
	}
	return <h1>Hi, {user.name}!</h1>;
}