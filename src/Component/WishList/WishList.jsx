import React, { useContext, useEffect, useState } from "react";
import './WishList.module.css'
import { wishContext } from "../../Context/WishContext";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";

export default function WishList() {

  let {addToCart,setNumberOfCartItems} = useContext(cartContext);
  async function addProduct(id) {

      let {data}  =await addToCart(id);
      if(data.status==="success"){
          toast.success("added");
      }
      setNumberOfCartItems(data.numOfCartItems);
      
  }



const [wishList, setwishList] = useState(null);
 let {getWishList,removeItemFromWishList,getAllWish}  = useContext(wishContext);
 const [loading, setloading] = useState(true);
 

 async function removeItem(id) {
  setloading(true)
  let {data} = await removeItemFromWishList(id);
  if(data.status==="success"){
    toast.success("deleted")
    getAllWish();
    getWish();
    setloading(false)
  }

 }

 async function getWish() {
  let {data} = await getWishList();
  setwishList(data);
  setloading(false)

 }

 useEffect(() => {
  getWish();
 
 }, []);
 

  return <>
  {loading?<div className='w-100 py-5 d-flex justify-content-center '>
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
  <>
  
  <div className="bg-main-light p-4 my-5">
      <h2 className="mb-3 fw-bolder">my wish List</h2>
   
{wishList? <div>
 {wishList.data.map((product)=>
    
    <div key={product.id} className="row py-3 border border-bottom border-top-0 border-end-0 border-start-0 bg-main-light ps-4">
      <div className="col-md-2">
        <img className="w-100" src={product.imageCover} alt="" />
      </div>

      <div className="col-md-10  align-items-center  d-flex justify-content-between">

        <div className=" mt-3">
        <h2 className="h5">{product.title.split(" ").slice(0,8).join(" ")}</h2>
        <h2 className="text-main h5">price:{product.price}</h2>
        <button onClick={()=>removeItem(product.id)}  className="btn p-0 text-danger"><i className="fas fa-trash-can  "></i> Remove</button>
        </div>

        <div>
        <button onClick={()=>addProduct(product.id)} className="btn btn-outline-success p-2 px-3 fw-bolder">Add to Cart</button>
        </div>      
      </div>



    </div>

   
    )}
 </div>:<h2>wishList is empty</h2>}
   

  </div>

  
  </>
  
  
  }
  
   
  

  
  </>
}
  