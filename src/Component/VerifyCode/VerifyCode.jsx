import React, { useContext, useState } from "react";
import './VerifyCode.module.css'
import { useFormik } from "formik";
import axios from "axios";
import { passwordContext } from "../../Context/PasswordContext";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {

  let {verifyCode} = useContext(passwordContext)



  let navigate = useNavigate()

  async function verficationCode(values) {
    let {data}  = await verifyCode(values.code);
    console.log(data);
    if(data.status==="Success"){
      navigate('/Rpassword  ')
    }
  }





  let formik = useFormik({
    initialValues:{
      code:'',
    },onSubmit:verficationCode
  })
  

  


  return <>
  <h2 className="mb-2 mt-5 fw-bold">reset your account password</h2>

  <form action="" onSubmit={formik.handleSubmit}>
  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.code}  className="form-control mt-2" type="password" placeholder="code"  name="code"/>
  <button disabled={!(formik.dirty&&formik.isValid)}   className="btn btn-outline-success mt-3" type="submit" >verify</button>
  </form>
  
  
  </>
}
