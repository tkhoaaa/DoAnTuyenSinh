import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Enhanced Card Variants
const GlassCard = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-neutral-900 dark:text-white shadow-glass",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

const GradientCard = forwardRef(({ className, variant = "primary", ...props }, ref) => {
  const gradientClasses = {
    primary: "bg-gradient-to-br from-primary-500 to-primary-700",
    secondary: "bg-gradient-to-br from-secondary-500 to-secondary-700",
    accent: "bg-gradient-to-br from-accent-500 to-accent-700",
    success: "bg-gradient-to-br from-success-500 to-success-700",
    warning: "bg-gradient-to-br from-warning-500 to-warning-700",
    error: "bg-gradient-to-br from-error-500 to-error-700",
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg text-white shadow-lg",
        gradientClasses[variant],
        className
      )}
      {...props}
    />
  )
})
GradientCard.displayName = "GradientCard"

const FeatureCard = forwardRef(({ 
  className, 
  icon, 
  title, 
  description, 
  hover = true,
  ...props 
}, ref) => (
  <Card
    ref={ref}
    className={cn(
      "transition-all duration-200",
      hover && "hover:shadow-medium hover:-translate-y-1",
      className
    )}
    {...props}
  >
    <CardHeader>
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
          {icon}
        </div>
      )}
      {title && <CardTitle className="text-xl">{title}</CardTitle>}
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  </Card>
))
FeatureCard.displayName = "FeatureCard"

const StatsCard = forwardRef(({ 
  className, 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon,
  ...props 
}, ref) => {
  const changeColors = {
    positive: "text-success-600 dark:text-success-400",
    negative: "text-error-600 dark:text-error-400",
    neutral: "text-neutral-500 dark:text-neutral-400",
  }
  
  return (
    <Card
      ref={ref}
      className={cn("transition-all duration-200 hover:shadow-medium", className)}
      {...props}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {title}
            </p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              {value}
            </p>
            {change && (
              <p className={cn("text-sm", changeColors[changeType])}>
                {change}
              </p>
            )}
          </div>
          {icon && (
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})
StatsCard.displayName = "StatsCard"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  GlassCard,
  GradientCard,
  FeatureCard,
  StatsCard,
}
