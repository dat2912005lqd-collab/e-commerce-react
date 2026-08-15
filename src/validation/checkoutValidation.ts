import {isRequired, isPhone} from "../utils/validators";
export interface CheckoutFormData{
    customerName:string;
    phone:string;
    address:string;
    note?:string;
}
export function validateCheckout(data:CheckoutFormData):Record<string,string>{
    const errors: Record<string,string>={}
    const nameError=isRequired(data.customerName,"Họ tên");
    const phoneRequired=isRequired(data.phone,"Số điện thoại");
    const phoneError=isPhone(data.phone);
    const addressError=isRequired(data.address,"Địa chỉ");
    if(nameError){
        errors.customerName=nameError;
    }
    if(phoneRequired){
        errors.phone=phoneRequired;
    } else if(phoneError){
        errors.phone=phoneError;
    }
    if (addressError){
        errors.address=addressError;
    }
    return errors;
}