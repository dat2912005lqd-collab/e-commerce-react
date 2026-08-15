import { useState} from "react";
import type {Category} from "../../types/category";
export interface ProductFilterValue{
    categoryId?:number;
    priceMin?:number;
    priceMax?:number;
}
interface ProductFilterProps{
    categories:Category[];
    onChange:(filters:ProductFilterValue)=>void;
}
export default function ProductFilter({
    categories, onChange
}:ProductFilterProps){
    const[categoryId, setCategoryId]= useState("");
    const[priceMin, setPriceMin]=useState("");
    const[priceMax, setPriceMax]=useState("");
    const handleApply=()=>{
        const min=priceMin?Number(priceMin):undefined;
        const max=priceMax?Number(priceMax):undefined;
        onChange({
           categoryId:categoryId?Number(categoryId):underfined,
           priceMin:min, priceMax:max
        });
    };
    return (
        <div>
            <select
            value={categoryId}
            onChange={{event}=>
            setCategoryId(event.target.value)}
            >
                <option value="">
                    Tất cả danh mục
                </option>
                {categories.map((category)=>
                <option
                key={category.id}
                value={category.id}
                >{ category.name}</option>
                ))}
            </select>
       <input
        type="number"
        min="0"
        placeholder="Giá từ"
        value={priceMin}
        onChange={(event) =>
          setPriceMin(event.target.value)
        }
      />

      <input
        type="number"
        min="0"
        placeholder="Giá đến"
        value={priceMax}
        onChange={(event) =>
          setPriceMax(event.target.value)
        }
      />

      <button
        type="button"
        onClick={handleApply}
      >
        Lọc
      </button>
    </div>
  );
}