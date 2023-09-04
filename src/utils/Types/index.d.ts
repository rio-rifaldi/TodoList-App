import { BaseSyntheticEvent } from "react";
import { UseFormReturn } from "react-hook-form";

export type FormDataTodo = {
  todo: string;
};

export type AddTodoStaterPack = {
  isPending: boolean;
  FormTodos: UseFormReturn<FormDataTodo, any, undefined>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};
export type FormTodoProps = {
  addTodoStaterPack: AddTodoStaterPack;
};

export type ModalTodoProps = {
  refetchTodos: () => void;
  id: string;
};

export type ListProps = {
  todo: string;
  status: boolean;
  id: string;
  refetchTodos: () => void;
};

export type UpdateTodoProps = {
  id: string;
  pastTodo: string;
  refetchTodo: () => void;
};
