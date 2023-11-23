import axios from "axios";
import { createContext } from "react";

export let passwordContext =createContext();

export default function PasswordContextProvider(props) {


    function checkForgetPassword(email) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
            email
          })
          .then((res)=>res)
          .catch((err)=>err)
    }

    function verifyCode(resetCode) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
            resetCode
          })
          .then((res)=>res)
          .catch((err)=>err)
    }



    function resetPassword(email,newPassword) {
        console.log(email,newPassword);
        return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
            email,
            newPassword
          })
          .then((res)=>res)
          .catch((err)=>err)
    }




    return <passwordContext.Provider value={{checkForgetPassword,verifyCode,resetPassword}}>
        {props.children}
    </passwordContext.Provider>
}