import React, { useState } from 'react'
import login from "../../assets/images/img-01.webp";
import {useFormik} from 'formik'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import * as Yup from 'yup';
import {FallingLines} from "react-loader-spinner";
import {Helmet} from 'react-helmet'
export default function Registeration() {

const [error,setError]=useState(null)
const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
async function signUp(values){ 
  setLoading(true)
console.log(values)
try {
  const res=await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp",values)
console.log(res)
formik.values.name=''
formik.values.email=''
formik.values.password=''
formik.values.age=''
formik.values.phone=''
setLoading(false)
navigate("/login")
} catch (error) {
  if(error.response.data.msg!==''){
    setLoading(false)
setError(error.response.data.msg)
  }
}

 
}

// function validation(){
// // validation for user name
// const nameReg=/^(?!.*\d)[a-zA-Z]{8,20}$/;
// const emailReg=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if(formik.values.name===''){
//         document.querySelector(".error-msg").innerHTML='user name field can\'t be empty ';
//         document.querySelector(".error-msg").classList.remove('d-none'); 
//     } 
//     else if(!nameReg.test(formik.values.name) ){
//         document.querySelector(".error-msg").innerHTML='user name field accepts characters only min length is 8 max is 20 ';
//         document.querySelector(".error-msg").classList.remove('d-none') 
//     } 
//     else{
//         document.querySelector(".error-msg").classList.add('d-none') 
//     }
//     //=================================================================
//     // validation for email
//     if(formik.values.email===''){
//         document.querySelector(".error-msg").innerHTML='user name field can\'t be empty ';
//         document.querySelector(".error-msg").classList.remove('d-none'); 
//     }
//     else if(!emailReg.test(formik.values.email)){
//         document.querySelector(".error-msg").innerHTML='email adddress is invalid ';
//         document.querySelector(".error-msg").classList.remove('d-none') 
//     }
//     else{
//         document.querySelector(".error-msg").classList.add('d-none')   
//     }
// // ===================================================================
// // validation for password
// if(formik.values.password===''){
//     document.querySelector(".error-msg").innerHTML='user name field can\'t be empty ';
//     document.querySelector(".error-msg").classList.remove('d-none'); 
// }
// else if(!emailReg.test(formik.values.email)){
//     document.querySelector(".error-msg").innerHTML='email adddress is invalid ';
//     document.querySelector(".error-msg").classList.remove('d-none') 
// }
// else{
//     document.querySelector(".error-msg").classList.add('d-none')   
// }
// }

let validationSchema=Yup.object({
name:Yup.string().min(8,"user name must be at least 8 characters").max(20,'user name couldnot exceed 20 character').required("user field is required"),
email:Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'email address is invalid').required("email field is required"),
password:Yup.string().matches(/^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{10,16}$/,'passwprd must contain  at least one uppercase, one lowercase and one numeric character ,one special character lenght must be between 10 and 16 also no white spaces').required("password field is required"),
age:Yup.number().min(18,'age must be at least 18').required("user field can't be empty"),
phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone number").required("user field can't be empty"),
})

    const formik=useFormik({
initialValues:{
  name:'',
  email:'',
  password:'',
  age:'',
  phone:'',
},
validationSchema,
onSubmit:signUp,
})


  return (
    <>
    <Helmet>
      <title>regsiteration</title>
    </Helmet>
      <div className="container px-2 my-3">
        <h1 className='text-center'>Note App</h1>
        <div className="row">
          <div className="col-md-6 col-12">
          <div className="image-container mx-2">
  <img className='w-100' src={login} alt='pic'></img>
</div>
          </div>
          <div className="col-md-6 col-12">

          <form className='py-3' onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur}>
  
  <input className='form-control mb-3' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id='name'  name='name' type='text' placeholder='user name'></input>
  {formik.touched.name&&formik.errors.name?<div className='error-msg alert alert-danger '>{formik.errors.name}</div>:null}
  <input className='form-control mb-3' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' name='email' type='email' placeholder='email'></input>
  {formik.touched.email&&formik.errors.email?<div className='error-msg alert alert-danger '>{formik.errors.email}</div>:null}
  <input className='form-control mb-3' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' name='password' type='password' placeholder='password'></input>
  {formik.touched.password&&formik.errors.password?<div className='error-msg alert alert-danger '>{formik.errors.password}</div>:null}
  <input className='form-control mb-3' value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} id='age' name='age' type='number' placeholder='age'></input>
  {formik.touched.age&&formik.errors.age?<div className='error-msg alert alert-danger'>{formik.errors.age}</div>:null}
  <input className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id='phone' name='phone' type='tel' placeholder='phone'></input>
  {formik.touched.phone&&formik.errors.phone?<div className='error-msg alert alert-danger '>{formik.errors.phone}</div>:null}
  {error!==null?<div className='alert alert-danger'>{error}</div>:null}
  <div className='d-flex justify-content-center my-2' >for signing in<Link className='mx-2 text-decoration-none d-block' to='/login'>sign In</Link></div> 
<button className='btn btn-success d-block m-auto' >{loading===true ? <FallingLines
  color="#4fa94d"
  width="30"
  visible={true}
  ariaLabel='falling-lines-loading'
/>: "sign up"}</button>

</form>
          </div>
        
        

        </div>

      </div>
    </>
  )
}
