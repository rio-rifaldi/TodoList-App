import { initTRPC } from "@trpc/server";

export const { procedure: publicProcedure, router } = initTRPC.create({});
