import React, { useContext } from "react";
import './ProtectedRoute.module.css'
import { UserToken } from "../../UserToken/Usertoken";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {

let {userToken}= useContext(UserToken);
if(localStorage.getItem("userToken")){
  return props.children
}
else{

  return <Navigate to={'/login'}></Navigate>
}
}
