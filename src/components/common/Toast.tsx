interface ToastProps{
    message:string;
    type?:"success"|"error"|"info";
    onClose?:()=>void;
}
export default function Toast({
    message, type="info",onClose,
}:ToastProps){
    return (
        <div
        role="alert"
        data-type={type}
        >
            <span>{message}</span>
            {onClose&&(
            <button 
        type="button"
        onClick={onClose}
        aria-label="Đóng">x</button>)}
        </div>
    );
}