import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserToken } from "../../UserToken/Usertoken";
import logo from "../../Assets/images/freshcart-logo.svg"
import './Nav.module.css'
import { cartContext } from "../../Context/CartContext";
export default function Nav() {



  let { numberOfCartItems } = useContext(cartContext);
  let navigate = useNavigate()
  function Logout() {
    localStorage.removeItem("userToken");
    setUserToken(null)
    navigate('/login')
  }
  let { userToken, setUserToken } = useContext(UserToken)
  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 ">

      <div className="container-fluid  px-3">

        <Link className="navbar-brand" to="">
          <img className="w-100" src={logo} alt="" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {userToken ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 navElement">

            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="">Home</NavLink>
            </li>

            <li className="nav-item">


              <NavLink className="nav-link" to="Cart">Cart</NavLink>

            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="Products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="Categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="Brands">Brands</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="wishlist">Wish List</NavLink>
            </li>
          </ul> : ""}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item d-flex align-items-center justify-content-center ">
              {userToken ? <div className="d-flex justify-content-center align-items-center me-3 ">
                <div className="d-flex position-relative ">
                  <i className="fa-solid cartIcon fa-cart-shopping fs-4"></i>
                  <div className="numberOfCart d-flex justify-content-center align-items-center rounded-2"><span className="text-white number">{numberOfCartItems}</span></div>
                </div>
              </div> : ""}

              <div className="socialIcons d-flex cursor-pointer">
                <div >
                <i className="fa-brands fa-instagram m-2"></i>
                </div>

                <div className="">
                <i className="fa-brands fa-facebook m-2"></i>
                </div>


                <div className="">
                <i className="fa-brands fa-twitter m-2"></i>
                </div>

                <div className="">
                <i className="fa-brands fa-linkedin m-2"></i>
                </div>


              </div>

            </li>


            {userToken ? <li className="nav-item">
              <span onClick={Logout} className="nav-link cursor-pointer" >Logout</span>
            </li> :
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="Register">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="Login">Login</NavLink>
                </li>
              </>
            }
          </ul>

        </div>
      </div>
    </nav>



  </>
}
