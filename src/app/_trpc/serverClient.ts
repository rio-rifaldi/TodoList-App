import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url:
        process.env.NODE_ENV === "production"
          ? "todolist-app-rio-rifaldi.vercel.app/api/trpc"
          : "http://localhost:3000/api/trpc",
    }),
  ],
});
