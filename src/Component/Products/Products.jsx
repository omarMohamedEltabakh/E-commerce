import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  { BallTriangle } from 'react-loader-spinner'
import { cartContext } from "../../Context/CartContext";

import toast from "react-hot-toast";
import { wishContext } from "../../Context/WishContext";


export default function Products() {

  const [allFeaturedProducts, setallFeaturedProducts] = useState(null);
  
  const [originalFeaturedProducts, setOriginalFeaturedProducts] = useState(null);

  
  const [isLoading, setIsloading] = useState(true);

  

  let {addToWishList,allWishItems,getAllWish} = useContext(wishContext);

  
  async function addWish(id) {
    let {data} = await addToWishList(id);
    if(data.status==="success"){
      toast.success("it has been Successfully added");
    }
    getAllWish();

  }



  let {addToCart,setNumberOfCartItems} = useContext(cartContext);
  

  async function addProduct(id){
    let {data} = await addToCart(id);
    if(data.status==="success"){
      toast.success(data.message,{
        duration: 1000,
        position: 'top-center',
      });
      setNumberOfCartItems(data.numOfCartItems);
    
      
    }
  }

  async function getFeaturedProduct(){
    let {data} =await  axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    setallFeaturedProducts(data.data);
    setIsloading(false);
    setOriginalFeaturedProducts(data.data);
    console.log(data.data);
    
  }

  useEffect(() => {
    getFeaturedProduct()
  }, []);
  

  function search(e) {
    const inputValue = e.target.value;
    let searchItems = originalFeaturedProducts.filter((items)=> items.category.name.toLowerCase().includes(inputValue.toLowerCase()));
    setallFeaturedProducts(searchItems);
  }
  

  return <>
  

   

  {isLoading?<div className='w-100 py-5 d-flex justify-content-center  '>
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
  <div className="row my-5 ">
    <input onChange={(e)=>search(e)} type="text" className="mt-3 form-control" placeholder="search fot any things.." />
  {allFeaturedProducts.map((product)=>
    <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-12 gy-5 product ">
      <div className="shadow rounded-3 p-3 cart  ">
      <Link to={`/productDetails/${product.id}`}>
        <img src={product.imageCover} className='w-100' alt="" />
        <span className='text-main font-sm fw-bolder '> {product.category.name}</span>
        <h2 className='h5'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
        <div className='d-flex justify-content-between mt-3'>
          <span >{product.price} EGP</span>
          <span><i className='fas fa-star rating-color '></i>{product.ratingsAverage}</span>
        </div>
      </Link>
      <div className="d-flex justify-content-between align-items-center">
        <button onClick={()=>addProduct(product.id)}  className='btn bg-main text-white w-100 btn-sm mt-2  '> add to cart</button>
      <i onClick={() => addWish(product.id)} className={`fa-solid fa-heart fs-3 p-1 cursor-pointer iconLove ${allWishItems && allWishItems.find((item) => item._id === product._id)? "text-red": ""}`}></i>
      </div>
      </div>
    </div>
   )}
  </div>
  }
  
  
  </>
}

