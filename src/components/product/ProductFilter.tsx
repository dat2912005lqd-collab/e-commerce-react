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
    selectedCategoryId?: number | null;
    onSelectCategory?: (id: number | null) => void;
    priceRange?: [number, number];
    onPriceChange?: (range: [number, number]) => void;
    sortBy?: string;
    onSortChange?: (sort: string) => void;
    onReset?: () => void;
    totalProductsCount?: number;
  }
export default function ProductFilter({
    categories, onChange,
    selectedCategoryId,
    onSelectCategory,
    priceRange,
    onPriceChange,
    sortBy,
    onSortChange,
    onReset,
    totalProductsCount
}:ProductFilterProps){
    const[categoryId, setCategoryId]= useState("");
    const[priceMin, setPriceMin]=useState("");
    const[priceMax, setPriceMax]=useState("");
    const handleApply=()=>{
        const min=priceMin?Number(priceMin):undefined;
        const max=priceMax?Number(priceMax):undefined;
        onChange({
           categoryId:categoryId?Number(categoryId):undefined,
           priceMin:min, priceMax:max
        });
    };
    return (
        <div>
            <select
            value={categoryId}
            onChange={(event) =>
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
                )}
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