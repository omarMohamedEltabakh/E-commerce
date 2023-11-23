import React, { useContext, useEffect, useState } from "react";
import './Cart.module.css'
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {



  const [cartItems, setCartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let { getCart, removeCartItem, updateCart, setNumberOfCartItems } = useContext(cartContext);
  let { deleteCart } = useContext(cartContext);

  async function deleteUserCart() {
    await deleteCart();
    getCartItems();
    toast.success("Your cart is deleted")
  }


  async function updateCount(id, count) {
    let { data } = await updateCart(id, count);
    setCartItems(data);
  }
  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartItems(data)
    if (data.status === "success") {
      toast.success("deleted");
    }
    setNumberOfCartItems(data.numOfCartItems)

  }

  async function getCartItems() {
    let { data } = await getCart();
    setCartItems(data);
    setIsLoading(false);

  }


  useEffect(() => {
    getCartItems();
  }, []);



  return <>
    <div className="bg-main-light pb-3 px-4 my-5">
      {isLoading ? <div className='w-100 py-5 d-flex justify-content-center'>
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

      </div> : <>
        {cartItems ? <div className="bg-main-light p-4">

          <div className=" d-flex justify-content-between mb-3 w-100 flex-wrap">
            <h2 className=" ">Shop Cart:</h2>
            <Link to={`/CheckOut/${cartItems.data._id}`}><button className="btn bg-primary text-white py-2">Check Out</button></Link>
          </div>

          <div className=" d-flex justify-content-between w-100 flex-wrap">
            <h2 className="h5 text-main  ">Total Cart Price: {cartItems?.data.totalCartPrice}EGP</h2>

            <h2 className="h5 fw-medium  ">total number of items: <span className="text-main">{cartItems?.numOfCartItems}</span></h2>
          </div>




          {cartItems?.data.products.map((product) =>
            <div key={product._id} className="row py-3 border border-bottom border-top-0 border-end-0 border-start-0 bg-main-light">

              <div className="col-md-2 mt-2">
                <img className="w-100" src={product.product.imageCover} alt="" />
              </div>
              <div className="col-md-10  d-flex justify-content-between mt-2">
                <div className="">
                  <h2 className="h5 ">{product.product.title.split(" ").slice(0, 8).join(" ")}</h2>
                  <h2 className="text-main h5">price:{product.price}</h2>
                  <button onClick={() => removeItem(product.product._id)} className="btn p-0"><i className="fas fa-trash-can text-main "></i> Remove</button>
                </div>


                <div className="">
                  <button onClick={() => updateCount(product.product._id, product.count + 1)} className="btn btn-sm border me-1"> +</button>
                  <span>{product.count}</span>
                  <button onClick={() => updateCount(product.product._id, product.count - 1)} className="btn btn-sm border ms-1"> -</button>
                </div>
              </div>



            </div>


          )}




        </div> : <h1 className="text-center my-3 pt-3">cart is emptiy</h1>}
      </>


      }
      {cartItems ? <div className="d-flex justify-content-center my-2">
        <button onClick={() => deleteUserCart()} className="btn btn-outline-success  p-2 px-3 fw-bolder">Clear Your Cart</button>
      </div> : ""}


    </div>





  </>
}
