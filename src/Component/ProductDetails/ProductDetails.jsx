import React, { useContext } from "react";
import './ProductDetails.module.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

import {Helmet} from "react-helmet";

import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {

  let {addToCart,setNumberOfCartItems} = useContext(cartContext);

  async function addProduct(id) {

    let {data} = await addToCart(id);
    
    if(data.status=="success"){
      toast.success(data.message,{
        duration: 1000,
        position: 'top-center',
      });
      setNumberOfCartItems(data.numOfCartItems)
    }
  }
  
  let {id} = useParams();

  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let{data, isLoading} = useQuery("getProductDetails",()=>getProductDetails(id));

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return <>


  <Helmet>
    <title>{data?.data.data.title}</title>
  </Helmet>

  {data?.data.data?<div className="row py-2 align-items-center">
    <div className="col-md-4">
    <Slider {...settings}>
      {data?.data.data.images.map((image)=> <img key={data?.data.data.id} src={image} className='w-100'></img>)}
    </Slider>
    </div>
    <div className="col-md-8">
      <h2 className='h5'>{data?.data.data.title}</h2>
      <p>{data?.data.data.description}</p>
      <h6 className='text-main'>{data?.data.data.category.name}</h6>
      <h6 className='text-main'>Price:{data?.data.data.price} EGP</h6>
        <div className='d-flex justify-content-between mt-3'>
          <span >{data?.data.data.price} EGP</span>
          <span><i className='fas fa-star rating-color '></i>{data?.data.data.ratingsAverage}</span>
        </div>
        
        <button onClick={()=>addProduct(data?.data.data.id)} className='btn bg-main text-white w-100 btn-sm '> add to cart</button>
    </div>

  </div>:""}
  
  </>
}
