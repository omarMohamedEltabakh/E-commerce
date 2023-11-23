import React, { useContext, useEffect, useState, } from "react";
import { useFormik } from "formik";

import { json, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";

export default function CheckOut() {



  // <=================================>
  const userToken = localStorage.getItem("userToken");

  const headers = {
    token: userToken
  };

  async function getAllorders() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers
      });
      const dataString = JSON.stringify(data.data);
      localStorage.setItem("allItems", dataString);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  // <=================================>
  let { onlinePayment } = useContext(cartContext);
  let { id } = useParams()

  async function chekout(values) {
    let { data } = await onlinePayment(id, values);
    if (data.status === "success") {
      window.location.href = data.session.url;
    }

  }





  let formik = useFormik({
    initialValues: {

      details: "",
      phone: "",
      city: "",

    }, onSubmit: chekout
  })

  return <>

    <div className="container w-75 m-auto py-4">

      <form onSubmit={formik.handleSubmit}>

        <label className="mt-4" htmlFor="details">Details:</label>
        <input value={formik.values.details} onChange={formik.handleChange} className="form-control" id="details" type="text" name="details" />

        <label className="mt-4" htmlFor="Phone">Phone</label>
        <input value={formik.values.Phone} onChange={formik.handleChange} className="form-control" id="Phone" type="Phone" name="Phone" />

        <label className="mt-4" htmlFor="city">city:</label>
        <input value={formik.values.city} onChange={formik.handleChange} className="form-control" id="city" type="text" name="city" />

        <button onClick={() =>getAllorders()} disabled={!(formik.dirty && formik.isValid)} className="btn btn-outline-success  w-100 mt-4">Pay Now</button>

      </form>

    </div>

  </>
}
