export default function Button({ children, type, className = "", ...props }) {
    return (
        <button
            className={className}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}