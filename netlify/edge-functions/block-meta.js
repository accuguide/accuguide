export default async (request, context) => {
  const userAgent = request.headers.get("user-agent") || "";

  if (userAgent.toLowerCase().includes("meta-externalagent")) {
    return new Response("Forbidden", { status: 403 });
  }

  return context.next();
};

export const config = {
  path: "/*",
};
