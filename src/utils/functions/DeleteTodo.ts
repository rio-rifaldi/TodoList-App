import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";

type Props = {
  refetchTodos: () => void;
  id: string;
};

export const DeleteTodo = ({ id, refetchTodos }: Props) => {
  const deleteTodo = trpc.deleteTodo.useMutation({
    onSettled() {
      refetchTodos();
    },
    onSuccess(data, variable, context) {
      const DateNow = new Date();
      const Now =
        DateNow.toLocaleTimeString() + "  " + DateNow.toLocaleDateString();
      toast({
        title: `Todo Deleted`,
        description: `'${data?.todo}' deleted on ${Now}`,
        duration: 1600,
      });
    },
  });
  return { deleteTodo };
};
