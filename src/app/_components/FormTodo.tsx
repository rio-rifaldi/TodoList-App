import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormTodoProps } from "@/utils/Types";

const FormTodo = ({ addTodoStaterPack }: FormTodoProps) => {
  const { FormTodos, isPending, onSubmit } = addTodoStaterPack;
  return (
    <>
      <form
        className="my-5 flex gap-4 justify-center max-w-md mt-24 w-full"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <Input
          type="text"
          id="todo"
          className="w-full border-slate-400 dark:border-slate-800"
          {...FormTodos.register("todo")}
          required
        />
        <Button type="submit" disabled={isPending}>
          add
        </Button>
      </form>
    </>
  );
};

export default FormTodo;
