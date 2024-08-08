import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({ type = "text", ...props }, ref) {
    const id = useId();
    return (
        <div className="flex flex-col gap-3">
            {props.label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {props.label}
                </label>
            )}
            <input
                ref={ref}
                id={id}
                type={type}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                {...props}
            />
        </div>
    );
});
export default Input