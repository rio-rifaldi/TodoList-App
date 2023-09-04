"use client";

import { trpc } from "@/app/_trpc/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormDataTodo } from "../Types";

type Props = {
  refetchTodos: () => void;
};
export const AddTodo = ({ refetchTodos }: Props) => {
  const [isPending, startTransisition] = useTransition();
  const FormTodos = useForm<FormDataTodo>();

  const addTodos = trpc.addTodo.useMutation({
    onSettled() {
      refetchTodos();
    },
  });

  const onSubmit = FormTodos.handleSubmit(({ todo }) => {
    startTransisition(() => {
      addTodos.mutate({ todo });
    });

    FormTodos.reset();
  });

  return { isPending, onSubmit, addTodos, FormTodos };
};
