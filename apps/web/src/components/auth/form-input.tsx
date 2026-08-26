"use client";

import { Input } from "@/components/ui/input";
import FormError from "./form-error";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ id, label, error, className, ...props }: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input
        id={id}
        {...props}
        className={cn("rounded-xl", error && "border-destructive focus-visible:ring-destructive", className)}
      />

      <FormError message={error} />
    </div>
  );
}

export default FormInput;
