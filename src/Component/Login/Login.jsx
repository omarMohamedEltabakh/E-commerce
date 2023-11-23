import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserToken } from "../../UserToken/Usertoken";

export default function Login() {
  let {  setUserToken } = useContext(UserToken);

  const [error, seterror] = useState(null);
  let navigate = useNavigate();
  const [check, setcheck] = useState(false);



  async function LoginSubmit(values) {
    setcheck(true)
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        seterror(error.response.data.message);
        setcheck(false)
      })
    if (data.message === "success") {
      setcheck(false)
      setUserToken(data.token);
      localStorage.setItem("userToken", data.token)
      navigate('/');
    }

  }
  let validation = yup.object({

    email: yup.string().email("email is invalid").required("email is requrid"),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d ]{8,}$/, "Enter a password with- At least one letter (uppercase or lowercase).At least one digit (0-9).Minimum length of 8 characters").required("password is requried"),

  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    }, onSubmit: LoginSubmit, validationSchema: validation
  })

  return <>

    <div className="login container w-75 m-auto p-5 shadow mt-5 rounded-2 ">


      <h1>Login Now:</h1>


      {error ? <div className="alert alert-danger py-2 mt-1">{error}</div> : ""}
      <form className="form-login" onSubmit={formik.handleSubmit}>

        <label className="mt-2" htmlFor="email">Email</label>
        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="email" type="email" name="email" />
        {(formik.errors.email && formik.touched.email) ? <div className="alert alert-danger py-2 mt-1">{formik.errors.email}</div> : ""}

        <label className="mt-2" htmlFor="password">Password:</label>
        <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" id="password" type="password" name="password" />
        {(formik.errors.password && formik.touched.password) ? <div className="alert alert-danger py-2 mt-1">{formik.errors.password}</div> : ""}



        <div className="d-flex justify-content-between align-items-center flex-wrap">
        {check ? <button className="btn bg-main  text-white mt-2"><i className="fas fa-spinner fa-spin"></i></button> :
          <button disabled={!(formik.dirty&&formik.isValid)} className="btn bg-main text-white mt-2">Login</button>
        }
        <Link to={"/forgetPassword"}><h2 className="main-font cursor-pointer h4  mt-2 ">forget your password ?</h2></Link>
        </div>
      </form>

    </div>

  </>
}















