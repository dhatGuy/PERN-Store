import React from "react";
import { cn } from "~/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  color?: "default" | "info" | "failure" | "warning" | "success";
}

const Label: React.FC<LabelProps> = ({
  children,
  className,
  disabled = false,
  color = "default",
  ...props
}) => {
  return (
    <label
      className={cn(
        styles.root.base,
        disabled && styles.root.disabled,
        styles.root.colors[color],
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;

const styles = {
  root: {
    base: "text-sm font-medium",
    disabled: "opacity-50",
    colors: {
      default: "text-gray-900 dark:text-white",
      info: "text-cyan-500 dark:text-cyan-600",
      failure: "text-red-700 dark:text-red-500",
      warning: "text-yellow-500 dark:text-yellow-600",
      success: "text-green-700 dark:text-green-500",
    },
  },
};
