import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ContextNote, { noteContext } from '../ContextNote/ContextNote';
import {Oval} from "react-loader-spinner"
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

import 'sweetalert2//dist/sweetalert2.min.css'
export default function Home() {
const {addNote,displayNote,deleteNote,updateNote}=useContext(noteContext)
const [notes,setNotes]=useState(null)
const [id,setId]=useState(null);
const [addNoteBtn,setAddNoteBtn]=useState(null)
// async function addNote (values){
//   console.log(localStorage.getItem('token'))
//   try {
//  const res=await axios.post("https://note-sigma-black.vercel.app/api/v1/notes",values,{
//   headers:{token:`3b8ny__${localStorage.getItem('token')}`}
// })
// displayNote()
// formik.values.content='';
// formik.values.title='';
// console.log(res)
//   } catch (error) {
//     console.log(error)
//   }

// }

// async function displayNote(){
// try {
//   const {data:{notes}}=await axios.get("https://note-sigma-black.vercel.app/api/v1/notes",{
//   headers:{token:`3b8ny__${localStorage.getItem('token')}`}
// })
// setNotes(notes)
// console.log(notes)
// } catch (error) {
//   console.log(error)
// }


// }
// const validationSchema={

function addNoteBtnFn(){
  setAddNoteBtn(true)
}
function updateNoteBtnFn(){
  setAddNoteBtn(false)
}

async function clearForm (){
  formik.values.title='';
  formik.values.content='';
  await displayingNotes();
}

async function addingNote(values){
 const res =await addNote(values);
 console.log(res.data)
  formik.values.title='';
  formik.values.content='';
  displayingNotes();
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Your Note Added successfully',
    showConfirmButton: false,
    timer: 1800
  })
}
 async function displayingNotes(){

    const res= await displayNote();
 console.log(res)
 setNotes(res)
    
  
 
}
async function deletingNote(id){

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res= await deleteNote(id);
 console.log(res);
 displayingNotes()
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}

async function updatingNotes({content,title,id}){
 
formik.values.title=title;
formik.values.content=content;
setId(id);
console.log(id)
const res=await displayingNotes()
updateNoteBtnFn()
}

async function updateSpecificNote(e,id,val){
  formik.values.title='';
  formik.values.content='';
 const res= await updateNote(id,val);
 const resp= await displayingNotes();
  console.log(res,resp);
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Your Note Updated Successfully',
    showConfirmButton: false,
    timer: 1800
  })
}

async function cancel(){
 
document.querySelector("#title").value=''
document.querySelector("#content").value=''
await displayNote();

}
useEffect(()=>{
  displayingNotes()

},[])

const formik=useFormik({
  initialValues:{
    title:'',
    content:'',
  },
  onSubmit:addingNote,
  
})

if(notes===null){

  return <div className="container vh-100 d-flex justify-content-center align-items-center">
    <Oval
  height={80}
  width={80}
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#4fa94d"
  strokeWidth={2}
  strokeWidthSecondary={2}

/>
  </div>
}
else if(notes==='empty' ){
  return  <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container">
  <a className="navbar-brand" href="">Notee</a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    
      <li className="nav-item">
        <Link className="nav-link" to="/logout">Logout</Link>
      </li>
    </ul>
  
  </div>
</div>
</nav>
  <div className="container">
  
{/* modal */}

<button onClick={addNoteBtnFn} type="button" className="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
Add Note
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearForm}></button>
    </div>
    <div className="modal-body">
    <form className='' onSubmit={formik.handleSubmit}>
  <input name='title' value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} id='title' type='text' placeholder='Title' className='form-control mb-3' ></input>
  <input name='content'value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} id='content' type='text' placeholder='Content' className='form-control mb-3' ></input>

<div className="modal-footer">
  {
    addNoteBtn===true ? <>
     <button data-bs-dismiss="modal"  className='my-4 btn btn-success d-block ms-auto'>Add Note</button>
     <button type='button' data-bs-dismiss="modal"  onClick={()=>{cancel()}} className='btn btn-secondary my-4  d-block ms-auto'>Cancel</button>
    
    </> :<>
    <button type='button' data-bs-dismiss="modal"  onClick={()=>{cancel()}} className='btn btn-secondary my-4  d-block ms-auto'>Cancel</button>
    <button type='button' data-bs-dismiss="modal" onClick={(e)=>{updateSpecificNote(e,id,{title:formik.values.title,content:formik.values.content})}} className='my-4 btn btn-primary d-block ms-auto'>update Note</button>
    </> 
  }



</div>

</form>
    </div>
  </div>
</div>
</div>

<div className='w-50 rounded rounded-4 border border-2 p-3 my-3 ms-auto d-none'>
<form className='' onSubmit={formik.handleSubmit}>
  <input name='title' value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} id='title' type='text' placeholder='Title' className='form-control mb-3' ></input>
  <input name='content'value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} id='content' type='text' placeholder='Content' className='form-control mb-3' ></input>

  <div className="d-flex justify-content-between" >
     <button  className='my-4 btn btn-success d-block ms-auto'>Add Note</button>
<button type='button' onClick={()=>{updateSpecificNote(id,{title:formik.values.title,content:formik.values.content})}} className='my-4 btn btn-success d-block ms-auto'>update Note</button>
<button type='button' onClick={()=>{cancel()}} className='my-4 btn btn-success d-block ms-auto'>Cancel</button>
</div>

</form>
</div>
<div className="row my-5 p-3 g-3">
{notes==='empty'? <h1 className='text-center'>no notes to show</h1>: notes?.map((eachNote,index)=>{
return <div key={index} className="col-md-4 col-12">
<div className=" container rounded rounded-3 border-4 border-black bg-body-secondary p-3 ">
<div className='text-center m-3 overflow-hidden'>{eachNote.title}</div>
<div className='text-center m-3 overflow-hidden'>{eachNote.content}</div>
<div className='d-flex justify-content-around'>
  <button onClick={()=>{deletingNote(eachNote._id)}} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
  <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updatingNotes({title:eachNote.title,content:eachNote.content,id:eachNote._id})}} className='btn btn-primary'> <i className="fa-regular fa-pen-to-square"></i></button></div>


</div>

</div>
})}
</div>
  </div>
 
    

  </>
}

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="">Notee</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
      </ul>
    
    </div>
  </div>
</nav>
    <div className="container">
    
{/* modal */}

<button onClick={addNoteBtnFn} type="button" className="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add Note
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearForm}></button>
      </div>
      <div className="modal-body">
      <form className='' onSubmit={formik.handleSubmit}>
    <input name='title' value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} id='title' type='text' placeholder='Title' className='form-control mb-3' ></input>
    <input name='content'value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} id='content' type='text' placeholder='Content' className='form-control mb-3' ></input>
 
  <div className="modal-footer">
    {
      addNoteBtn===true ? <>
       <button data-bs-dismiss="modal"  className='my-4 btn btn-success d-block ms-auto'>Add Note</button>
       <button type='button' data-bs-dismiss="modal"  onClick={()=>{cancel()}} className='btn btn-secondary my-4  d-block ms-auto'>Cancel</button>
      
      </> :<>
      <button type='button' data-bs-dismiss="modal"  onClick={()=>{cancel()}} className='btn btn-secondary my-4  d-block ms-auto'>Cancel</button>
      <button type='button' data-bs-dismiss="modal" onClick={(e)=>{updateSpecificNote(e,id,{title:formik.values.title,content:formik.values.content})}} className='my-4 btn btn-primary d-block ms-auto'>update Note</button>
      </> 
    }
 
 
 
  </div>

  </form>
      </div>
    </div>
  </div>
</div>

<div className='w-50 rounded rounded-4 border border-2 p-3 my-3 ms-auto d-none'>
  <form className='' onSubmit={formik.handleSubmit}>
    <input name='title' value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} id='title' type='text' placeholder='Title' className='form-control mb-3' ></input>
    <input name='content'value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur} id='content' type='text' placeholder='Content' className='form-control mb-3' ></input>
 
    <div className="d-flex justify-content-between" >
       <button  className='my-4 btn btn-success d-block ms-auto'>Add Note</button>
  <button type='button' onClick={()=>{updateSpecificNote(id,{title:formik.values.title,content:formik.values.content})}} className='my-4 btn btn-success d-block ms-auto'>update Note</button>
  <button type='button' onClick={()=>{cancel()}} className='my-4 btn btn-success d-block ms-auto'>Cancel</button>
  </div>

  </form>
</div>
<div className="row my-5 p-3 g-3">
{notes?.map((eachNote,index)=>{
return <div key={index} className="col-md-4 col-12">
  <div className=" container rounded rounded-3 border-4 border-black bg-body-secondary p-3 ">
  <div className='text-center m-3 overflow-hidden'>{eachNote.title}</div>
  <div className='text-center m-3 overflow-hidden'>{eachNote.content}</div>
  <div className='d-flex justify-content-around'>
    <button onClick={()=>{deletingNote(eachNote._id)}} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
    <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updatingNotes({title:eachNote.title,content:eachNote.content,id:eachNote._id})}} className='btn btn-primary'> <i className="fa-regular fa-pen-to-square"></i></button></div>
 
  
  </div>

</div>
})}
</div>
    </div>
   
      

    </>
  )
}
