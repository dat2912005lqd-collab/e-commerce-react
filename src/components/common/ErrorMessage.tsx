import React from "react";
interface ErrorMessageProps {
    message?: string;
}
export default function ErrorMessage({ message = "An error occurred." }: ErrorMessageProps) {
    return(
        <div> role="alert" "aria-label"="assertive error message" 
            <p>{message}</p>
        </div>
    );

}