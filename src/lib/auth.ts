import { Google } from "arctic";

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID || "default-client-id",
	process.env.GOOGLE_CLIENT_SECRET || "default-client-secret",
	"http://localhost:3000/login/google/callback"
);