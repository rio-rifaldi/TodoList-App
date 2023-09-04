import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "../_trpc/client";

import UpdateTodo from "./UpdateTodoModal";
import { DeleteTodoModal } from "./DeleteTodoModal";
import { ListProps } from "@/utils/Types";

function List({ id, status, todo, refetchTodos }: ListProps) {
  const { mutate: setStatusTodo } = trpc.setDoneTodo.useMutation({
    onSettled() {
      refetchTodos();
    },
  });

  return (
    <div className="w-full max-w-md flex py-2 px-5 shadow-md justify-between items-center dark:bg-slate-800 rounded-sm bg-[#FCFCFC]">
      <Checkbox
        type="submit"
        checked={status}
        aria-checked={status}
        className="peer cursor-pointer"
        onCheckedChange={() =>
          setStatusTodo({ id, status: status ? false : true })
        }
      />
      <p className="text-sm  text-black peer-aria-checked:line-through peer-aria-checked:text-slate-500 dark:text-white break-all mx-4 ">
        {todo}
      </p>
      <div className="flex gap-3">
        <UpdateTodo id={id} pastTodo={todo} refetchTodo={refetchTodos} />

        <DeleteTodoModal refetchTodos={refetchTodos} id={id} />
      </div>
    </div>
  );
}

export default List;
