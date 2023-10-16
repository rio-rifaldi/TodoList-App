import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateTodoProps } from "@/utils/Types";
import { UpdateTodo } from "@/utils/functions/UpdateTodo";
import { Edit3Icon } from "lucide-react";

const UpdateTodoModal = ({ id, pastTodo, refetchTodo }: UpdateTodoProps) => {
  const { UpdateTodoForm, onSubmit, updateTodo } = UpdateTodo({
    id,
    pastTodo,
    refetchTodo,
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="bg-blue-600 hover:bg-blue-700 md:p-3"
        >
          {" "}
          <Edit3Icon size={17} className="text-white w-4 md:w-[1.1rem]" />{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[330px] rounded-lg ">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Are you sure want Update &apos{pastTodo}&apos . Click save when
            you&aposre done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4 "
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Todo
            </Label>
            <Input
              id="newTodo"
              placeholder="type new todo here..."
              className="col-span-3 focus:ring-0 text-sm"
              required
              {...UpdateTodoForm.register("todo")}
            />
          </div>
          <DialogFooter className="flex-row justify-end gap-2 mt-4">
            <Button type="reset" variant={"destructive"} size={"sm"}>
              Reset
            </Button>
            {updateTodo.isLoading ? (
              <SpinnerLoading />
            ) : (
              <Button type="submit" size={"sm"}>
                Save
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoModal;
