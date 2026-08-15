interface CartSummaryProps{
    subtotal:number;
    onCheckout:()=>void;
}
export default function CartSummary({
    subtotal, onCheckout
}:CartSummaryProps){
    return(
        <aside>
            <h2>Tóm tắt đơn hàng</h2>
            <p>Tạm tính: ${subtotal.toFixed(2)}</p>
            <small>Chưa gồm VAT/ship.</small>
            <button type="button" onClick={onCheckout}>
                Thanh toán
            </button>
        </aside>
    );
}