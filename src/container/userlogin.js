import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const UserLogin = () => {

    let[userLogin,setUserLogin] = useState({
        "email"  : "",
        "password" : "",
    })
    let navigate = useNavigate();

    const getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserLogin({
            ...userLogin, [name] : value,
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(userLogin);
        fetch("http://localhost:3001/users?email="+userLogin.email+"&password="+userLogin.password,{
            method : "GET",
            headers : {"Content-type" : "application/json"},
            // body : JSON.stringify(userLogin),
        }).then(async(res)=>{
            let userData = await res.json();
            sessionStorage.setItem("userdata",JSON.stringify(userData[0].id));
            window.location = "/userlogin";
        }).catch((err)=>{
            toast.error(err);
            window.location = "/userlogin";
        })
    }
    return(
        <>
            <div className="container py">
                <div className="login-title text-center">
                <h4 className="fw-bold pb-5 text-dark">My Account</h4>
                </div>
                <div className="">
                    <div className="login-form row justify-content-center">
                        <form className="col-6 border border-dark border-2 p-5 border-opacity-25" method="post" onSubmit={(e)=>submitForm(e)}>
                            <h5 className="fw-bolder">Login</h5>
                            <p className="pt-3 text-muted">If You've Account,please Login.!</p>
                            <div className="form-group py-4">
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={(e)=>getInputValue(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>getInputValue(e)}/>
                            </div>
                            <button className="btn btn-dark w-100 my-3">Login</button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}