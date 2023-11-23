import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Component/Home/Home"
import Layout from "./Component/Layout/Layout";
import Cart from "./Component/Cart/Cart";
import Products from "./Component/Products/Products";
import Brands from "./Component/Brands/Brands";
import Categories from "./Component/Categories/Categories";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import NotFound from "./Component/NotFound/NotFound";
import Allorders from "./Component/Allorders/Allorders";
import Nav from "./Component/Nav/Nav";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import WishList from "./Component/WishList/WishList";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword";
import Footer from "./Component/Footer/Footer";
import CheckOut from "./Component/CheckOut/CheckOut";
import VerifyCode from "./Component/VerifyCode/VerifyCode";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import CreateContextProvider from "./UserToken/Usertoken";
import CartContextProvider from "./Context/CartContext";
import WishContextProvider from "./Context/WishContext";
import PasswordContextProvider from "./Context/PasswordContext";
import Rpassword from "./Component/Rpassword/Rpassword";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

let routers= createBrowserRouter([
  {path:"",element:<Layout/>,children:[
    {path:"",element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"Brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"Categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"Login",element:<Login/>},
    {path:"Nav",element:<Nav/>},
    {path:"Footer",element:<Footer/>},
    {path:"Register",element:<Register/>},
    {path:"WishList",element:<WishList/>},
    {path:"ForgetPassword",element:<ForgetPassword/>},
    {path:"CheckOut/:id",element:<CheckOut/>},
    {path:"Rpassword",element:<Rpassword/>},
    {path:"VerifyCode",element:<VerifyCode/>},
    {path:"allorders",element:<Allorders/>},
    {path:"ProductDetails/:id",element:<ProductDetails/>},
    {path:"*",element:<NotFound/>}
  ]}
])

export default function App() {

  return<>
  <PasswordContextProvider>
      <WishContextProvider>

    <CartContextProvider>

    <CreateContextProvider>
          <Provider store={store}>
          <RouterProvider router={routers}></RouterProvider>

          </Provider>

    </CreateContextProvider>
    
    </CartContextProvider>
    </WishContextProvider>

  </PasswordContextProvider>
  
  </>

   
  
  

  

}
