import { useEffect,useState } from "react";
import { useParams,Link } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const SingleProduct = () => {
    let [singleProduct, setSingleproduct] = useState([]);
    let[userLogin , setuserLogin] = useState();
    let params = useParams();

    useEffect(() => {
        let productID = params.productID;
        const get_product_data = () => {
            fetch("http://localhost:3001/product/" + productID)
                .then(async (res) => {
                    let record = await res.json();
                    setSingleproduct(record);
                }).catch((err) => {
                    console.log(err.message);
                })
        }
        get_product_data();
    }, [setSingleproduct])

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
                    setuserLogin(userData);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }
        getLoginUser();
    },[setuserLogin]);

    const addTocart = () => {
        let productID = singleProduct.id;
        let userID = userLogin.id;
        let quantity = 1;

        fetch("http://localhost:3001/cart?productID="+productID+"&userID="+userID,{
            method : "get",
            headers : {"Content-type" : "application/json"},
        }).then(async(res)=>{
            let record = await res.json();
            if(record.length == 0){
                const cartData = {
                    productID : productID,
                    userID : userID,
                    quantity : quantity
                };
                fetch("http://localhost:3001/cart",{
                    method : "post",
                    headers : {"Content-type" : "application/json"},
                    body : JSON.stringify(cartData),
                }).then(async(res)=>{
                    let cartdd = await res.json();
                    // console.log("cartdd"+cartdd);
                    fetch("http://localhost:3001/cart?userID="+userID,{
                        method : "get",
                        headers : {"Content-type" : "application/json"},
                    }).then(async(res)=>{
                        let countCart = await res.json();
                        console.log(countCart.length);
                        sessionStorage.setItem('cartCount' , countCart.length);
                        window.location = "http://localhost:3000/singleProduct/"+productID;
                    }).catch((err)=>{
                        console.log("record not found");
                    });
                    toast("Product Added into cart.")
                }).catch((err)=>{
                    toast.error(err);
                })
            }
            else{
                toast("This Product is already in cart.")
            }
        }).catch((err)=>{
            toast.error(err);
        })
    }


    return(
        <>
            {/* single product */}
            <section className="container portfolio py-5 mt-2 wow animate__animated animate__fadeInUp aimate_delay_3s">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 pe-5">
                        <img src={singleProduct.image} alt="single_img" className="rounded-3"/>
                    </div>
                    <div className="col-md-6">
                        <h3 className="fw-bold">{singleProduct.name}</h3>
                        <div className="d-flex py-2" style={{ color: '#ffbe00' }}>
                            <p><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" />
                            </p><span className="text-muted ms-2">16 reviews</span>
                        </div>
                        <h4> $300.00</h4>
                        <small className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions.</small>
                        <div className="py-3">
                            <p className="text-muted fw-bold">Size Chart </p>
                            <div className="d-flex size" style={{ color: '#262626' }}>
                                <button className="btn btn-dark me-3">S</button>
                                <button className="btn btn-light shadow me-3">M</button>
                                <button className="btn btn-light shadow me-3">L</button>
                                <button className="btn btn-light shadow">XL</button>
                            </div>
                        </div>
                        <div className="py-3">
                            <p className="text-muted fw-bold">Quantity</p>
                            <div className="d-flex quantity align-items-center text-center size">
                                <button className="btn btn-light shadow">-</button>
                                <h4 className="px-3 pt-2">1</h4>
                                <button className="btn btn-light shadow">+</button>
                            </div>
                        </div>
                        {userLogin ? 
                        <Link to="/cart" className="btn b-button w-50 py-3 rounded-pill fs-6 mt-3" onClick={()=>addTocart()}>Add To cart</Link> :
                        <Link to="/userlogin" className="btn b-button w-50 rounded-pill py-3 mt-3">Add To Cart</Link>}
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </>
    )
}