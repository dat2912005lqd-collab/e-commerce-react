import {isPositiveNumber} from "../utils/validators";
export function validateQuantity(quantity:number):string|null{
    return isPositiveNumber(quantity, "Số lượng;")
}
export function validateCartItem(productId:number,quantity:number    
):Record<string,string>{
    const errors:Record<string,string>={};
    if(!productId||productId<=0){
        errors.productId="Sản phẩm không hợp lệ.";
    }
    const quantityError=validateQuantity(quantity);
    if(quantityError){
        errors.quantity=quantityError;
    }
    return errors;
}