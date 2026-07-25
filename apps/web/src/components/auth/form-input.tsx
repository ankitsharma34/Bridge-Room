"use client";

import { Input } from "@/components/ui/input";
import FormError from "./form-error";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ id, label, error, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input id={id} {...props} />

      <FormError message={error} />
    </div>
  );
}
