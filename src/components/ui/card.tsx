import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Renders a card component with consistent spacing and padding.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card component.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the header of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card header.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card header component.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the title of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card title.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card title component.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the description of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card description.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card description component.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Renders an action section within a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card action.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card action component.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the content of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card content.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card content component.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(className)}
      {...props}
    />
  )
}

/**
 * Renders the footer of a card component.
 *
 * @param {string} [className] - Additional CSS classes to apply to the card footer.
 * @param {object} props - Additional props to pass to the div element.
 * @returns {JSX.Element} The rendered card footer component.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
