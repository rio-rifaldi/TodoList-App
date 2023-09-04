import { z } from "zod";
import { publicProcedure } from "../trpc";
import { prisma } from "../../../prisma/db";

export const routerTododelete = {
  deleteTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      try {
        console.time("delete Todo:");

        const resultDeletedTodo = await prisma.todos.delete({
          where: { id: input.id },
        });
        console.timeEnd("delete Todo:");

        return resultDeletedTodo;
      } catch (error) {
        console.log(error);
      }
    }),
};
