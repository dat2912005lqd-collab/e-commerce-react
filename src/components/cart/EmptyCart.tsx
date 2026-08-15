import { Link} from "react-router-dom";
export default function EmptyCart(){
    return(
        <div>
            <h2>Giỏ hàng đang trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục</p>
            <Link to="/products">
            Tiếp tục mua sắm
            </Link>
        </div>
    );
}