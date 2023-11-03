import React, { useState } from 'react'
import login from "../../assets/images/img-01.webp";
import {useFormik} from 'formik'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import {FallingLines} from 'react-loader-spinner'
import * as Yup from 'yup';
export default function Login() {
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const navigate=useNavigate()
async function signIn(values){
  setLoading(true)
console.log(values)
try {
  const {data}=await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signIn",values)
setLoading(data)
  console.log(data)
formik.values.email='';
formik.values.password='';

localStorage.setItem("token",data.token);
navigate("/layout");
setLoading(false)
} catch (error) {
  console.log(error.response.data.msg)
  setError(error.response.data.msg)
  setLoading(false)
}

 
}

let validationSchema=Yup.object({
  email:Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'email address is invalid').required("email field is required"),

password:Yup.string().matches(/^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{10,16}$/,'passwprd must contain  at least one uppercase, one lowercase and one numeric character ,one special character lenght must be between 10 and 16 also no white spaces').required("password field is required"),
})

    const formik=useFormik({
initialValues:{
  email:'',
  password:'',

},
validationSchema,
onSubmit:signIn,
})


  return (
    <>
      <div className="container px-3 my-3">
        <h1 className='text-center'>Note App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-12">
          <div className="image-container  mx-2">
  <img className='w-100' src={login} alt='pic'></img>
</div>
          </div>
          <div className="col-md-6 col-sm-12">
          <form className='py-5' onSubmit={formik.handleSubmit} onChange={formik.handleChange} onBlur={formik.handleBlur}>
  
  <input className='form-control mb-3' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' name='email' type='email' placeholder='email'></input>
{formik.touched.email&&formik.errors.email?<div className='error-msg alert alert-danger '>{formik.errors.email}</div>:null}

<input className='form-control mb-3' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' name='password' type='password' placeholder='password'></input>
{formik.touched.password&&formik.errors.password?<div className='error-msg alert alert-danger '>{formik.errors.password}</div>:null}

{error!==null?<div className='alert alert-danger'>{error}</div>:null}
<div className='d-flex justify-content-center my-2' >for signing up<Link className='mx-2 text-decoration-none d-block' to='/registeration'>sign Up</Link></div> 
<button type='submit' className='btn btn-success d-block m-auto'>{loading===true?<FallingLines
color="#4fa94d"
width="30"
visible={true}
ariaLabel='falling-lines-loading'
/>:"sign in"}</button>
</form>

          </div>
        
        
        </div>

      </div>
    </>
  )
}

