import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "rounded-md border border-gray-300 px-4 py-2 text-slate-700",
        className
      )}
      {...props}
    />
  );
};

export default Input;
