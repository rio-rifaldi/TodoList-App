import SpinnerLoading from "@/components/ui/SpinnerLoading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ModalTodoProps } from "@/utils/Types";
import { DeleteTodo } from "@/utils/functions/DeleteTodo";
import { Trash2Icon } from "lucide-react";

export function DeleteTodoModal({ refetchTodos, id }: ModalTodoProps) {
  const { deleteTodo } = DeleteTodo({ refetchTodos, id });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"} className="md:p-3">
          {" "}
          <Trash2Icon className="w-4 md:w-[1.1rem] " />{" "}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Todo
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" flex-row justify-end  w-full mt-5">
          {deleteTodo.isLoading ? (
            <SpinnerLoading />
          ) : (
            <div className="items-center ">
              <AlertDialogCancel className="mr-4">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => deleteTodo.mutate({ id })}
              >
                Continue
              </AlertDialogAction>
            </div>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
