import { cn } from "../_lib/utils"

interface SeparatorProps extends React.ComponentProps<"div"> {}

export const Separator = ({ className, ...rest }: SeparatorProps) => {
  return <div className={cn("my-6 h-px bg-border", className)} {...rest} />
}
