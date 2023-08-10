import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {

    let[userLogin,setUserLogin] = useState({
        "name" : "",
        "email"  : "",
        "password" : "",
    })
    const getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserLogin({
            ...userLogin, [name] : value,
        })
        console.log(name);
        console.log(value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log(userLogin);
        fetch("http://localhost:3001/users",{
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(userLogin),
        }).then(async(res)=>{
            let userData = await res.json();
            setUserLogin(userData);
            toast("Registration Successfully..")
        }).catch((err)=>{
            toast.error(err);
        })
    }
    return(
        <>
            <div className="container py">
                <div className="login-title text-center">
                <h4 className="fw-bold pb-5 text-dark">Register Yourself</h4>
                </div>
                <div className="">
                    <div className="login-form row justify-content-center">
                        <form className="col-6 border border-dark border-2 p-5 border-opacity-25" method="post" onSubmit={(e)=>submitForm(e)}>
                            <h5 className="fw-bolder">Registration</h5>
                            <div className="form-group py-4">
                                <input type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" onChange={(e)=>getInputValue(e)}/>
                            </div>
                            <div className="form-group pb-4">
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={(e)=>getInputValue(e)}/>
                            </div>
                            <div className="form-group pb-4">
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>getInputValue(e)}/>
                            </div>
                            <button className="btn btn-dark w-100 my-3">Register</button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}