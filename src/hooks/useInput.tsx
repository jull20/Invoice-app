import { useState } from "react";

export default function useInput(initialValue: string){
    const [value, setValue] = useState<string>(initialValue);
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValue(e.currentTarget.value)
    } 
    return {value, onChange}
}