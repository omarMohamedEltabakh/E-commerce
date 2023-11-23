import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export let wishContext = createContext();
export default function WishContextProvider(props) {
    

    let userToken = localStorage.getItem("userToken");
    const [allWishItems, setAllWishItems] = useState(null);
    
    async function getAllWish() {
        let {data}  = await  getWishList();
        setAllWishItems(data?.data);
        
    }

    useEffect(() => {
        
        getAllWish()
    
    }, []);
    

    let headers = {
        token:userToken
    }
    function addToWishList(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId:id
        },{
            headers
        }).then((res)=>res)
        .catch((err)=>err)
        
    }
    function getWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    function removeItemFromWishList(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }


    return <wishContext.Provider value={{addToWishList,getWishList,removeItemFromWishList,allWishItems,setAllWishItems,getAllWish}}>
    {props.children}
</wishContext.Provider>



    
}