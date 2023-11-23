import React from "react";
import './CategorySlider.module.css'
import axios from "axios";
import { useQuery } from "react-query";

import Slider from "react-slick";

export default function CategorySlider() {

  function getCategorySlider(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let {data} = useQuery("category",getCategorySlider);
  var settings = {
    dots: false,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  return <>

  <Slider {...settings}>
    
  {data?.data.data.map((category)=>
    <img key={category._id} className="w-100 my-3 rounded-2 overflow-hidden"  height= {200} src={category.image} alt="" />
  )}
    </Slider>
 


  
  </>
}
