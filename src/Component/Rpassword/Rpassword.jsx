import React, { useContext } from "react";
import './Rpassword.module.css'
import { useFormik } from "formik";
import { passwordContext } from "../../Context/PasswordContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as yup from "yup"


export default function Rpassword() {


let validationSchema = yup.object({
  newPassword:yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Enter a password with- At least one letter (uppercase or lowercase).At least one digit (0-9).Minimum length of 8 characters"),
})

  let navigate = useNavigate();
  let {resetPassword} = useContext(passwordContext);

  async function resetUserPassword(values) {
    let {data} = await resetPassword(values.email,values.newPassword);
    localStorage.setItem("userToken",data.token);
    if(data.token){
      navigate('/login');
    }
  }

  let formik = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },onSubmit:resetUserPassword,validationSchema
  })

  return <>
  <form   onSubmit={formik.handleSubmit}>
    <h1 >reset your account password</h1>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}  className="form-control mt-2" type="email" placeholder="email"  name="email"/>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}  className="form-control mt-2" type="password" placeholder="newPassword"  name="newPassword"/>
    {(formik.errors.newPassword && formik.touched.newPassword )?<div className="alert alert-danger py-2 mt-1">{formik.errors.newPassword}</div>:""}
    <button disabled={!(formik.dirty&&formik.isValid)}   className="btn btn-outline-success mt-3" type="submit" >reset Password</button>
  </form>
  
  </>
}
