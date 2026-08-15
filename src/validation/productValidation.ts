import {isRequired, isPositiveNumber} from "../utils/validators";
export interface ProductFormData{
    title:string;
    price:string;
    categoryId:number;
    description?:string;
}
export function validateProduct(data:ProductFormData):Record<string,string>{
    const errors:Record<string, string>={};
    const titleError=isRequired(data.title,"Tên sản phẩm");
    const priceError=isPositiveNumber(data.price,"Giá");
    if (titleError){
        errors.title=titleError;    }
    if (priceError){
        errors.price=priceError;
    }
    if(!data.categoryId||data.categoryId<=0){
        errors.category="Vui lòng chọn danh mục.";
    }
    return errors;
}