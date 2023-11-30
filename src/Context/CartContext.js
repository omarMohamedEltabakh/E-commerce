import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();


export default function CartContextProvider(props) {
    
    
    
     const [numberOfCartItems, setNumberOfCartItems] = useState(0);
    
    async function getCartItems() {
        let {data} = await getCart();
        if(data?.status === "success"){
            setNumberOfCartItems(data.numOfCartItems);
        }
    }
    useEffect(() => {
        getCartItems();
     
    }, []);
    
    
    let userToken = localStorage.getItem("userToken");

    let headers = {
        token:userToken
    }

    function addToCart(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:id
        },{
             headers
        }
        ).then((res)=>{
            console.log(res.data.data);
            return res
        })
         .catch((err)=>err)
       
    
    
    }


    function getCart(){

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        },)
        .then((res)=>res)
        .catch((err)=>err)
      
    }
  

    function removeCartItem(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers
        }).then((res)=> res)
        .catch((err)=>err)
        
      

    }


    function updateCart(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count
        },{
            headers
        })
        .then((res)=> res)
        .catch((err)=>err)
        
    }

    function deleteCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((res)=> res)
        .catch((err)=>err)
    }

    function onlinePayment(id,shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://e-commerce-pink-three.vercel.app/allorders`,{
            shippingAddress
        },{
            headers
        })
        .then((res)=> res)
        .catch((err)=>err)
    }


  

    return <cartContext.Provider value={{setNumberOfCartItems,addToCart,getCart,removeCartItem,updateCart,deleteCart,onlinePayment,numberOfCartItems}}>
        {props.children}
    </cartContext.Provider>
    
}

