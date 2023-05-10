import { cn } from "@/lib/utils"
import React, { FC } from "react"

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "border border-gray-300 rounded-md px-4 py-2 text-slate-700",
        className
      )}
      {...props}
    />
  )
}

export default Input
