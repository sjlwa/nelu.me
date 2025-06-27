import { ActionError } from "astro:actions";
import { getSession } from "auth-astro/server";
import { ADMIN_WHITELIST } from "astro:env/server";

export async function authorizeResource(request: Request) {

  const session = await getSession(request);

  const whitelist = ADMIN_WHITELIST.split(" ");
  const isAuthorized: boolean = whitelist.includes(session?.user?.email!);

  if (!session) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "User must be logged in",
    });
  }

  if (!isAuthorized) {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "User must be registered as admin",
    });
  }

}
