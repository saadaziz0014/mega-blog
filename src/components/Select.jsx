import { forwardRef, useId } from "react";

function Select({ options, value, onChange, label, className }, ref) {
    const id = useId();
    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <select
                ref={ref}
                id={id}
                value={value}
                onChange={onChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                {options?.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select);