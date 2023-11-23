import React, { useContext, useEffect, useState } from "react";
import './Layout.module.css'
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserToken } from "../../UserToken/Usertoken";

export default function Layout() {
  let {setUserToken} = useContext(UserToken)
  useEffect(() => {
    if(localStorage.getItem("userToken")){
      setUserToken(localStorage.getItem("userToken"))
    }
  
    
  }, []);
  
  return <>
  <Nav/>
  <div className="container">
    <Outlet></Outlet>
  </div>
  <Footer/>

  </>
}
