import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {

    let[userLogin , setUserLogin] = useState();
    let[cartData , setCartData] = useState(0);

    useEffect(()=>{
        const getLoginUser = () =>{
            let userID = sessionStorage.getItem('userdata');
            if(userID){
                fetch("http://localhost:3001/users/"+userID,{
                    method : "GET",
                    headers : {"Content-type" : "application/json"},
                }).then(async (res)=>{
                    let userData = await res.json();
                    console.log(userData);
                    setUserLogin(userData);
                    let countData = sessionStorage.getItem('cartCount');
                    setCartData(countData);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
        getLoginUser();

    },[setUserLogin]);

    const logout = () => {
        sessionStorage.removeItem('userdata');
        window.location = "/userlogin";
    }

    return (
        <>
            <header className="navbar navbar-expand-lg py-3 wow animate__animated animate__fadeInDown">
                <div className="container">
                    <div className="logo">
                        <h1 className="navbar-brand d-inline-block fw-bolder fs-3 py-2">ShopMax</h1>
                    </div>
                    <div className="order-lg-1 d-flex">
                        <button className="rounded-2 navbar-toggler me-2 py-2" data-bs-toggle="collapse" data-bs-target="#menu">
                            <span className="navbar-toggler-icon">
                            </span>
                        </button>
                        <div className="d-flex align-items-center justify-content-end my-2">

                            {userLogin ? 
                            (
                                <a href style={{"color" : "black"}}><i className="fa-solid fa-user mx-2"/><span>{userLogin.name}</span></a>

                            ) : 
                            (
                                <a href style={{"color" : "black"}}><i className="fa-solid fa-user mx-2"/><span>Register</span></a>

                            ) 
                            }

                            {/* cart count  */}
                           
                                <Link to="/cart" className="mx-3" style={{"color" : "black"}}><i className="fa-solid fa-cart-shopping me-2"/><span>{userLogin ? cartData : 0}</span></Link>
                            

                            {/* log out */}
                            {userLogin ? 
                            (
                                <button onClick={()=>logout()} style={{"color" : "black"}} className="bg-dark text-light px-3 mx-2 py-1 rounded-pill">Log Out</button>
                            ) : 
                            (
                                <Link to="/userlogin" className="bg-dark text-light py-2 px-3 rounded-pill" style={{"color" : "black"}}><span>Login</span></Link>
                            )}
                        </div>
                    </div>
                    <nav id="menu" className="navbar-collapse justify-content-start">
                        <ul className="navbar-nav">
                            <li><a href="/" className="nav-link me-4 ms-5 menu fw-semibold">HOME</a></li>
                            <li><a href="#" className="nav-link me-4 menu fw-semibold">SHOP</a></li>
                            <li><a href="#" className="nav-link me-4 menu fw-semibold">FEATURES</a></li>
                            <li><a href="#" className="nav-link me-4 menu fw-semibold">LOOKBOOK</a></li>
                            <li><a href="#" className="nav-link me-4 menu fw-semibold">PAGES</a></li>
                            <li><a href="#" className="nav-link me-4 menu fw-semibold">BLOG</a></li>
                            <li><a href="#" className="nav-link me-1 menu fw-semibold">BUY NOW!!</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

        </>
    )

}