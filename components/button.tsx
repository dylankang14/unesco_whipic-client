"use client";

import { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  className?: string;
  isLoading?: boolean;
}

export default function Button({
  text,
  className,
  isLoading,
  ...rest
}: ButtonProps & HTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending || isLoading} className={`${className ? className : ""} btn btn-primary`} {...rest}>
      {pending || isLoading ? "로딩 중" : text}
    </button>
  );
}
