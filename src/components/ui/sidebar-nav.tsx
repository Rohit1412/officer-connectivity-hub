import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "./sidebar"

export const SidebarNav = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="nav"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarNav.displayName = "SidebarNav"

export interface SidebarNavLinkProps extends React.ComponentProps<typeof Button> {
  icon: React.ElementType;
  title: string;
  active?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

export const SidebarNavLink = React.forwardRef<
  HTMLButtonElement,
  SidebarNavLinkProps
>(({ className, icon: Icon, title, active, tooltip, ...props }, ref) => {
  const { isMobile, state } = useSidebar()

  const button = (
    <Button
      ref={ref}
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        active && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <span className="truncate">{title}</span>
    </Button>
  )

  if (!tooltip) {
    return button
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...(typeof tooltip === "string" ? { children: tooltip } : tooltip)}
      />
    </Tooltip>
  )
})
SidebarNavLink.displayName = "SidebarNavLink"