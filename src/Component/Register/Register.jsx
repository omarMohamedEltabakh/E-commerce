import React, { useState } from "react";
import './Register.module.css'
import {  useFormik } from "formik";
import * as yup from "yup"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {

const [error, seterror] = useState(null);
let navigate = useNavigate();
const [check, setcheck] = useState(false);



async function registerSubmit(values) {
  setcheck(true)
  let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
  .catch((error)=>{
    seterror(error.response.data.message);
    setcheck(false)
  })
  if(data.message==="success"){
    localStorage.setItem("userToken",data.token);
    setcheck(false)
    navigate('/Login');
  }
  
}
let validation  = yup.object({

  name:yup.string().min(3,"min length is 3").max(15,"max length is 15").required("name is required"),
  email:yup.string().email("email is invalid").required("email is requrid"),
  password:yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d ]{8,}$/,"Enter a password with- At least one letter (uppercase or lowercase).At least one digit (0-9).Minimum length of 8 characters"),
  rePassword:yup.string().required("rePassword is required").oneOf([yup.ref("password")],"repassword doesn't not match the password"),
  phone:yup.string().required("phone number is required").matches(/^(01)(0|1|2|5)[0-9]{8}$/,"the phone number must be start 01(0,1,2,5) and Eight more numbers")
})

let formik = useFormik({
  initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  },onSubmit:registerSubmit,validationSchema:validation
})

  return <>
  
  <div  className="container w-75 m-auto  p-5 register-form shadow  mt-4 rounded-2">
    <h1>register Now:</h1>

    {error?<div className="alert alert-danger py-2 mt-1">{error}</div>:""}
    <form onSubmit={formik.handleSubmit}>
      <label  className="mt-2" htmlFor="name">Name:</label>
      <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="name" type="text" name="name" />
      {(formik.errors.name && formik.touched.name )?<div className="alert alert-danger py-2 mt-1">{formik.errors.name}</div>:""}

      <label className="mt-2" htmlFor="email">Email</label>
      <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="email" type="email" name="email" />
      {(formik.errors.email && formik.touched.email )?<div className="alert alert-danger py-2 mt-1">{formik.errors.email}</div>:""}

      <label  className="mt-2" htmlFor="password">Password:</label>
      <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="password" type="password" name="password" />
      {(formik.errors.password && formik.touched.password )?<div className="alert alert-danger py-2 mt-1">{formik.errors.password}</div>:""}

      <label  className="mt-2" htmlFor="repassword">RePassword:</label>
      <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="repassword" type="password" name="rePassword" />
      {(formik.errors.rePassword && formik.touched.rePassword )?<div className="alert alert-danger py-2 mt-1">{formik.errors.rePassword}</div>:""}

      <label  className="mt-2" htmlFor="phone">Phone:</label>
      <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="phone" type="tel" name="phone" />
      {(formik.errors.phone && formik.touched.phone )?<div className="alert alert-danger py-2 mt-1">{formik.errors.phone}</div>:""}

      

      {check?<button  className="btn bg-main text-white mt-2"><i className="fas fa-spinner fa-spin"></i></button>:
      <button disabled={!(formik.dirty&&formik.isValid)} className="btn bg-main text-white mt-2">Register</button>
      }
    </form>

  </div>
  
  </>
}
