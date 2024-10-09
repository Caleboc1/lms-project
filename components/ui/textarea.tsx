import * as React from "react";

// Define the props interface, extending standard textarea attributes
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

// Create the Textarea component using React.forwardRef
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={`block w-full h-32 p-4 border rounded-lg shadow-md resize-none focus:ring-2 focus:ring-slate-500 focus:outline-none focus:border-slate-500 transition duration-150 ease-in-out placeholder-slate-400 bg-slate-100 ${className}`}
                ref={ref}
                {...props} // Spread other props such as rows, cols, etc.
                placeholder="e.g 'This course is about...'" // Default placeholder text
            />
        );
    }
);

// Set the display name for better debugging
Textarea.displayName = "Textarea";

// Export the Textarea component
export { Textarea };
