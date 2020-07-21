import { Router, send } from "../../../deps.ts";
import { settings } from "../../config/index.ts";

const router = new Router();

router.get("/(.*)", async (context: any) => {
  if (settings.env === "production") {
    let path = context.request.url.pathname.split("/")[1];
    let resource = context.request.url.pathname;
    let options = { root: Deno.cwd() };
    if (path !== "build") {
      resource = "build/index.html";
    }
    await send(context, resource, options);
  } else {
    context.response.status = 200;
    context.response.body = "ready";
  }
});

export default router;
