import { useEffect, useState } from "react";
export function useDebounce<T>(value:T,delay:400){
    const [debouncedValue, setDebounceValue]=useState(value);
    useEffect(()=>{
        const timer= window.setTimeout(()=>{
            setDebounceValue(value);
        },delay);
        return ()=>
        { window.clearTimeout(timer);};
    },[value,delay]);
    return debouncedValue;
}