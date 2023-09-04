import { trpc } from "@/app/_trpc/client";
import { serverClient } from "@/app/_trpc/serverClient";

type Props = {
  initialTodo?: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
};

export const GetTodos = ({ initialTodo }: Props) => {
  const Todos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodo,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const refetchTodos = () => {
    Todos.refetch();
  };

  return { Todos, refetchTodos };
};