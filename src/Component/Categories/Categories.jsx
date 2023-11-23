import React, { useState } from "react";
import "./Categories.module.css"
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function Categories() {
  const [spCategory, setSpCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  
  const [loading, setloading] = useState(false);
  
  
  function getAllCategory(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  async function getApecificCategory(id) {
    setloading(true);
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    setSpCategory(data.data);
    getAllSubCategory(id);
    setloading(false)

  
  }
 
  async function getAllSubCategory(id){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}/subcategories`);
    setSubCategory(data.data)

  }

  let {data, isLoading } = useQuery("category",()=>getAllCategory());

  return <>
  
  {isLoading?<div className='w-100 py-5 d-flex justify-content-center'>
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
  </div>:

  <div className="row gy-3 mt-3 ">
    {data?.data.data.map((item)=>
    <div key={item._id}  className="col-lg-4  col-sm-6 col-12 ">
      <div className="border rounded-2 categoryItems overflow-hidden  " onClick={()=>getApecificCategory(item._id)} >
      <div height={400} className=" test d-flex justify-content-center align-items-center  ">
      <img  src={item.image} className="w-100 object-fit-cover"  alt="" />
      </div>
      <h3 className="text-center py-3 text-main fw-bold">{item.name}</h3>
      </div>
    </div>
    )}
  </div>
  }




  {loading?<div className='w-100 py-5 d-flex justify-content-center isloadingBacground fixed-top vh-100 vw-100  '>
    <div className=" w-100 h-100 d-flex justify-content-center align-items-center">
    <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
    </div>
  
  </div>:
  <div className="pb-5">
  {spCategory?<div className="row">
    <h1 className="text-main text-center h3 fw-bolder mt-2">{spCategory.name} subcategories</h1>
  </div>:""}

  {subCategory?<div className="row pt-3 mb-5 gy-2">
    {subCategory.map((sCategory)=>
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 ">
      <h4 className="p-3 border rounded-2 fw-bolder text-center">{sCategory.name}</h4>
    </div>
    )}

  </div>:""}
  </div>
}


  </>
}
