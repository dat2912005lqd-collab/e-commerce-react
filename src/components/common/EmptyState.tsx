interface EmptyStateProps {
    message?: string;
}
export default function EmptyState({ message = "No data available." }: EmptyStateProps) {
    return(
        <div role="status" aria-label="status message">
            <p>{message}</p>
        </div>
    );
}