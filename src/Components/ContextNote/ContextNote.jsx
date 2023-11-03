import React , { createContext,useState } from 'react';
import axios from 'axios';


export const noteContext=createContext()
export default function ContextNote({children}) {



// add note function
async function addNote (values){
    console.log(localStorage.getItem('token'))
    try {
   const res=await axios.post("https://note-sigma-black.vercel.app/api/v1/notes",values,{
    headers:{token:`3b8ny__${localStorage.getItem('token')}`}
  })
 
  return res;
    } catch (error) {
      console.log(error)
    }
  
  }
  
// display note
async function displayNote(){
    try {
      const {data:{notes}}=await axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
      headers:{token:`3b8ny__${localStorage.getItem('token')}`}
    })
return notes
  
    
    } catch (error) {
      console.log(error)
      return null
    }
    
    }

// delete note
async function deleteNote(id){
   const res=await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{
    headers:{token:`3b8ny__${localStorage.getItem("token")}`}
   })
   console.log(res)
}
// update note
async function updateNote(id,values){
  try {
    const res=await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,values,{
      headers:{token:`3b8ny__${localStorage.getItem('token')}`}
  }) 
  return res;
  } catch (error) {
    console.log(error)
  }

}


  return (
    <div>
      <noteContext.Provider value={{addNote,displayNote,deleteNote,updateNote}}>
{children}
      </noteContext.Provider>
    </div>
  )
}
