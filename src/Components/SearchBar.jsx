import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const SearchBar = ({items, setFound,location, setLocation, parentLocation}) => {
  const inputRef = useRef()
  const formRef = useRef()
  const handleSubmit = (e) =>{
    e.preventDefault()
    const {found,location:newLocation} =findItem(items,location,"")
    console.log(found,newLocation)   
    setFound(found)
    setLocation(newLocation)
  }
  useEffect(()=>{
    setLocation(prevState=>{
        const newState = prevState
        newState.push(parentLocation)
        return newState
    })
  },[])
  const findItem = (items,locationArray, oldLoaction) =>{
    const locationArr = [...locationArray]
    locationArr.push(oldLoaction)
    if(Array.isArray(items)){
        for(let i = 0; i<items.length;i++){
            if(typeof(items[i])==="string"||typeof(items[i])==="number"||typeof(items[i])==="boolean"){
                console.log("hi")
                if(items[i] == inputRef.current.value) {
                    return {found:true, location:locationArr}  
                }
                else if(i===items.length-1) return {found:false, location:[]} 
            }
            else if(Array.isArray(items[i])){ 
                const {found:bool,location:newLocation} = findItem(items[i], locationArr,`[${i}]`)
                if(bool){
                    return {found:true,location:locationArr.push(newLocation)}
                }
                else if(bool===false && i===items.length-1 ){
                
                    return {found:false,location:[]}
                }
            }
            else if(typeof(items[i])==="object"){
                const {found:bool,location:newLocation} = findItem(items[i], locationArr,`${items[i]}`)               
                if(bool){
                    return {found:true,location:locationArr.push(newLocation)}
                }
                else if(bool===false && i===items.length-1 ){
                    return {found:false,location:[]}
                }
            }
        }
    }
    else if(typeof(items) ==="object"){
        const itemss = Object.values(items)
        for(let i = 0; i<itemss.length;i++){
            if(typeof(itemss[i])==="string"||typeof(itemss[i])==="number"||typeof(itemss[i])==="boolean"){
                if(itemss[i] == inputRef.current.value) {
                    return {found:true, location:locationArr} 
                }
                else if(i===itemss.length-1) return {found:false,location:""}
            }
            else if(Array.isArray(items[i])){ 
                const {found:bool,location:newLocation} = findItem(itemss[i], locationArr,`${items[i]}[${i}]`)             
                if(bool){
                    return {found:true,location:locationArr.push(newLocation)}
                }
                else if(bool===false && i===itemss.length-1 ){
                
                    return {found:false,location:""}
                }
            }
            else if(typeof(itemss[i])==="object"){
                const {found:bool,location:newLocation} = findItem(itemss[i], locationArr,`${items[i]}`)
                if(bool){
                    return {found:true,location:locationArr.push(newLocation)}
                }
                else if(bool===false && i===itemss.length-1 )return {found:false,location:""}
                
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