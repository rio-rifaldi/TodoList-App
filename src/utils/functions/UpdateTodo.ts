import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

type Props = {
  id: string;
  pastTodo: string;
  refetchTodo: () => void;
};

export const UpdateTodo = ({ id, pastTodo, refetchTodo }: Props) => {
  const { toast } = useToast();
  const UpdateTodoForm = useForm<{ todo: string }>({
    defaultValues: { todo: pastTodo },
  });
  const updateTodo = trpc.updateTodo.useMutation({
    onSettled() {
      refetchTodo();
    },
    onSuccess() {
      toast({
        variant: "success",
        description: "todo has updated on " + new Date().toLocaleTimeString(),
        duration: 1600,
      });
    },
  });
  const onSubmit = UpdateTodoForm.handleSubmit(({ todo }) => {
    UpdateTodoForm.reset({ todo: "" });
    updateTodo.mutate({ newTodo: todo, id });
  });

  return { onSubmit, updateTodo, UpdateTodoForm };
};
