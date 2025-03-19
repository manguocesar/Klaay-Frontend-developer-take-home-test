import { cn } from "../lib/utils";

const ErrorMessage = ({ message, className }: { message: string, className?: string }) => (
    <p className={cn("text-red-500 text-center", className)}>{message}</p>
);

export { ErrorMessage };