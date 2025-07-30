import { redirect } from "react-router";

export async function requireAuth({ request }: { request: Request }) {
  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn) {
    const url = new URL(request.url);
    return redirect(`/login?redirectTo=${url.pathname}`);
  }
  return null;
}
