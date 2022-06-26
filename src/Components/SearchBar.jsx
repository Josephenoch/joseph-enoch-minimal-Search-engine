import React from 'react'
import { useRef } from 'react'

const SearchBar = ({items, setFound}) => {
  const inputRef = useRef()
  const formRef = useRef()
  const handleSubmit = (e) =>{
    e.preventDefault()
    setFound(findItem(items))
  }
  const findItem = (items) =>{
    if(Array.isArray(items)){
        for(let i = 0; i<items.length;i++){
            if(typeof(items[i])==="string"||typeof(items[i])==="number"||typeof(items[i])==="boolean"){
                if(items[i] == inputRef.current.value) {
                    return true 
                }
                else if(i===items.length-1) return false
            }
            else if(Array.isArray(items[i])){ 
                const bool = findItem(items[i])               
                if(bool){
                    return true
                }
                else if(bool===false && i===items.length-1 ){
                    return false
                }
            }
            else if(typeof(items[i])==="object"){
                const bool = findItem(items[i])               
                if(bool){
                    return true
                }
                else if(bool===false && i===items.length-1 ){
                    return false
                }
            }
        }
    }
    else if(typeof(items) ==="object"){
        const itemss = Object.values(items)
        for(let i = 0; i<itemss.length;i++){
            if(typeof(itemss[i])==="string"||typeof(itemss[i])==="number"||typeof(itemss[i])==="boolean"){
                if(itemss[i] == inputRef.current.value) {
                    return true 
                }
                else if(i===itemss.length-1) return false
            }
            else if(Array.isArray(itemss[i])){ 
                const bool = findItem(itemss[i])               
                if(bool){
                    return true
                }
                else if(bool===false && i===itemss.length-1 ){
                    return false
                }
            }
            else if(typeof(itemss[i])==="object"){
                const bool = findItem(itemss[i])               
                if(bool){
                    return true
                }
                else if(bool===false && i===itemss.length-1 ){
                    return false
                }
            }
        }
    }

    
    
    
    if(formRef.current.checkValidity()){
        // if(items.find(inputRef.current.value))setFound(true)
        // else setFound(false)
        
    }
  }
//   https://github.com/josephenoch/joseph-enoch-search-engine
  return (
    <form ref={formRef} className="w-4/5">
        <input ref={inputRef} required className="bg-white mr-[1%] w-[89%] p-2 rounded-md focus:ring-2 focus:outline-0 focus:ring-blue-100 shadow-lg"/>
        <button onClick={(e)=>handleSubmit(e)} type="submit" className="w-[10%] bg-gray-900 shadow-xl hover:scale-105 active:scale-90 transition-all duration-100 ease-linear rounded-lg text-white py-2">Search</button>
    </form>
  )
}

export default SearchBar