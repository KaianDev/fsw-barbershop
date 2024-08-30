import { cn } from "@/app/_lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva("animate-pulse rounded-md", {
  variants: {
    variant: {
      default: "bg-muted",
      secondary: "bg-card",
      tertiary: "bg-zinc-700",
      quaternary: "bg-zinc-800",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div className={cn(skeletonVariants({ variant, className }))} {...props} />
  )
}

export { Skeleton }
