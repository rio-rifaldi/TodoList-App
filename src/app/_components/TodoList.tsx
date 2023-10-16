"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GetTodos } from "@/utils/functions/GetTodos";
import { serverClient } from "../_trpc/serverClient";
import List from "./List";
import FormTodo from "./FormTodo";
import { AddTodo } from "@/utils/functions/AddTodo";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  initialTodo?: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
};

export default function TodoList({ initialTodo }: Props) {
  const { Todos, refetchTodos } = GetTodos({ initialTodo });
  const { onSubmit, addTodos, isPending, FormTodos } = AddTodo({
    refetchTodos,
  });
  return (
    <>
      <FormTodo addTodoStaterPack={{ onSubmit, isPending, FormTodos }} />
      {/* <ScrollArea className="w-full max-w-md h-[60vh] pr-4"> */}
      <div className="flex flex-col gap-2 w-full items-center ">
        {Todos.data?.map(({ id, todo, status }, index) => (
          <List
            id={id}
            todo={todo}
            status={status}
            key={Math.random() + index}
            refetchTodos={refetchTodos}
          />
        ))}
        {addTodos.isLoading && (
          <Skeleton className="w-full max-w-md h-14  rounded-sm dark:bg-slate-900 bg-slate-400 " />
        )}
        {Todos.isLoading && (
          <div className="flex gap-2 w-full max-w-md">
            <Skeleton className="w-full max-w-md h-14  rounded-sm dark:bg-slate-900 bg-slate-400 " />
            <Skeleton className="w-full max-w-md h-14  rounded-sm dark:bg-slate-900 bg-slate-400 " />
            <Skeleton className="w-full max-w-md h-14  rounded-sm dark:bg-slate-900 bg-slate-400 " />
            <Skeleton className="w-full max-w-md h-14  rounded-sm dark:bg-slate-900 bg-slate-400 " />
          </div>
        )}
      </div>
      {/* </ScrollArea> */}
    </>
  );
}
