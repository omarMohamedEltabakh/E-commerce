import React, { useContext, useState } from "react";
import './ForgetPassword.module.css'
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { passwordContext } from "../../Context/PasswordContext";


export default function ForgetPassword() {
  let {checkForgetPassword} = useContext(passwordContext);
  let navigate = useNavigate();

  
  async function forgetPassword(values) {
    let {data}  =await checkForgetPassword(values.email);
    if(data.statusMsg==="success"){
      navigate('/verifyCode');
    }
  }

  let formik = useFormik({
    initialValues:{
      email:""
    },onSubmit:forgetPassword
  })
  


  return <>
  <h2 className="mb-2 mt-5 fw-bold">please enter your verification code</h2>
  <form action="" onSubmit={formik.handleSubmit}>
  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}  className="form-control mt-2" type="email" placeholder="Email"  name="email"/>
  <button disabled={!(formik.dirty&&formik.isValid)}   className="btn btn-outline-success mt-3" type="submit" >verify</button>

  </form>
  
  
  </>
}
