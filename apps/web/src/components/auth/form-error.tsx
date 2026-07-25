"use client";
interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return <p className="text-sm font-medium text-destructive">{message}</p>;
};

export default FormError;
