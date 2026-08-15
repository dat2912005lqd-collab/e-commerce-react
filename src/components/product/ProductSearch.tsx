import { useEffect, useState } from "react";
interface ProductSearchProps{
    value?:string;
    onSearch:(value:string)=>void;
}
export default function ProductSearch({
    value='',onSearch,
}:ProductSearchProps){
    const[keyword, setKeyword]=useState(value); 
    useEffect(()=>{
        const timer=window.setTimeout(()=>{
            onSearch(keyword.trim())
        },400);
        return ()=>{
            window.clearTimeout(timer);
        };
    },[keyword, onSearch]);
    return(
        <input
        type="search"
        value={keyword}
        onChange={(event)=>setKeyword(event.target.value)}
        placeholder="Tìm kiếm sản phẩm"
        />
    );
}
