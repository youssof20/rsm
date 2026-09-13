import { useState } from 'react';
export function useStored<T>(key:string,initial:T):[T,(next:T|((prev:T)=>T))=>void] {
 const [value,setValue]=useState<T>(()=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):initial}catch{return initial}});
 function update(next:T|((prev:T)=>T)){setValue(prev=>{const result=typeof next==='function'?(next as (prev:T)=>T)(prev):next;try{localStorage.setItem(key,JSON.stringify(result))}catch{/* App remains usable when browser storage is unavailable. */}return result})}
 return [value,update];
}
