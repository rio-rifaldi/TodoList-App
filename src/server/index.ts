import { prisma } from "../../prisma/db";
import { routerTododelete } from "./routers/delete";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  sayHelo: publicProcedure.query((opts) => {
    return {
      greeting: "hello",
    };
  }),
  getTodos: publicProcedure.query(async (opts) => {
    const Todos = await prisma.todos.findMany();
    return Todos;
  }),

  addTodo: publicProcedure
    .input(
      z.object({
        // id : z.string(),
        todo: z.string(),
        // status: z.boolean()
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.clear();
        console.time("create Todo:");
        const resultInsertedTodo = await prisma.todos.create({
          data: { todo: input.todo },
        });
        console.timeEnd("create Todo:");

        return resultInsertedTodo;
      } catch (error) {
        console.log(error);
      }
    }),
  setDoneTodo: publicProcedure
    .input(z.object({ id: z.string(), status: z.boolean() }))
    .mutation(async ({ input }) => {
      console.time("check Todo:");
      const result = await prisma.todos.update({
        where: { id: input.id },
        data: { status: input.status },
      });

      console.timeEnd("check Todo:");
      return result;
    }),
  updateTodo: publicProcedure
    .input(z.object({ newTodo: z.string(), id: z.string() }))
    .mutation(async ({ input }) => {
      console.time("update Todo:");
      const result = await prisma.todos.update({
        where: { id: input.id },
        data: { todo: input.newTodo },
      });
      console.timeEnd("update Todo:");
      return result;
    }),
  ...routerTododelete,
});

export type AppRouter = typeof appRouter;
