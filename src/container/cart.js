import { useState, useEffect } from "react";
//total = nan
//showing only 1 item
export const Cart = () => {

    let [UserCartData, setUserCartData] = useState();
    let[total , setTotal] = useState(0);
    useEffect(() => {
        let userID = sessionStorage.getItem('userdata');
        const cartDetails = () => {
            fetch("http://localhost:3001/cart?userID=" + userID, {
                method: "GET",
                headers: { "Content-type": "application/json" },
            }).then(async (res) => {
                let record = await res.json();
                let productDatawithCart = [];
                let subTotal = 0;
                record.map((value, id) => {
                    fetch("http://localhost:3001/product/" + value.productID, {
                        method: "GET",
                        headers: { "Content-type": "application/json" },
                    }).then(async (res) => {
                        let singleProductDetails = await res.json();
                        singleProductDetails.quantity = value.quantity;
                        singleProductDetails.cartId = value.id;
                        productDatawithCart.push(singleProductDetails);
                        subTotal = subTotal + value.quantity * singleProductDetails.d_price;
                        console.log(productDatawithCart);
                        setUserCartData(productDatawithCart);
                        setTotal(total);
                    }).catch((err) => {
                        console.log(err);
                    })
                })
                setUserCartData(record);
            }).catch((err) => {
                console.log("Record not found.")
            })
        }
        cartDetails();
    }, [setUserCartData]);

    const removeItem = (cartId) => {
        console.log(cartId);
        fetch("http://localhost:3001/cart/" + cartId , {
            method : "delete",
            headers : {"Content-Type" : "application/json"},
        }).then(async (res) => {
            let userID = sessionStorage.getItem('userdata');
            fetch("http://localhost:3001/cart?userID" + userID,{
                method : "get",
                headers : {"Content-type" : "application/json"},
            }).then(async(res)=>{
                let countCartData = await res.json();
                console.log(countCartData.length);
                sessionStorage.setItem("cartCount",countCartData.length)
                window.location = "http://localhost:3000/cartData";
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    const addQuantity = (e,cartId , quantity) => {
        let qu = quantity+1;
        fetch("http://localhost:3001/cart/"+cartId,{
            method : "get",
            headers : {"Content-type" : "application/json"},
        }).then(async (res)=>{
            let userdata = await res.json();
            userdata.quantity = qu;
            fetch("http://localhost:3001/cart/"+cartId,{
                method : "put",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify(userdata),
            }).then(async (res)=>{
                let cc = await res.json();
                window.location =  "http://localhost:3000/cart";
            })
        }).catch((err)=>{
            console.log(err);
        })
    }

    const minusQuantity = (e,cartId , quantity) => {
        let qu = quantity-1;
        fetch("http://localhost:3001/cart/"+cartId,{
            method : "get",
            headers : {"Content-type" : "application/json"},
        }).then(async (res)=>{
            let userdata = await res.json();
            userdata.quantity = qu;
            fetch("http://localhost:3001/cart/"+cartId,{
                method : "put",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify(userdata),
            }).then(async (res)=>{
                let cc = await res.json();
                window.location =  "http://localhost:3000/cart";
            })
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <>
            {/* cart */}
            <section className="container cart py-5 mt-2">
                <div className="row justify-content-center">
                    <div className="col-8">
                    <table className="table">
                        <thead className="thead bg-dark text-light">
                            <tr>
                                <th scope="col">Product Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {UserCartData && UserCartData.map((value, index) => {
                                return (
                                    <tr className="py-3">
                                        <td><img src={value.image} alt className="product-img img-fluid rounded-3 shadow mx-3" width="150px" /></td>
                                        <td><h5 className="fw-bold pt-3">{value.name}</h5></td>
                                        <td><p className="pt-3 fw-semibold">{value.d_price}</p></td>
                                        <td>
                                            <div className="quantity d-flex pt-3">
                                            <div className="">
                                                <button className="btn btn-sm btn-light shadow btn-minus" onClick={(e)=>minusQuantity(e , value.cartId , value.quantity)}>
                                                    <i className="fa fa-minus" />
                                                </button>
                                            </div>
                                                <input type="text" className="form-control form-control-sm bg- text-center mx-2 shadow"  defaultValue={value.quantity} />
                                            <div className="">
                                                <button className="btn btn-sm btn-dark shadow btn-plus" onClick={(e)=>addQuantity(e , value.cartId , value.quantity)}>
                                                    <i className="fa fa-plus" />
                                                </button>
                                            </div>
                                            </div>
                                        </td>
                                        <td><p className="pt-3 fw-semibold">{value.d_price*value.quantity}</p></td>
                                        <td><button className="btn btn-sm btn-dark mt-3" onClick={()=>removeItem(value.cartId)}><i className="fa fa-times"/></button></td> 
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                    <div className="col-lg-4">
                            <div className="card border border-dark border-2 mb-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3 pt-1">
                                        <h6 className="fw-semibold">Sub Total</h6>
                                        <h6 className="fw-semibold">${total}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6 className="fw-semibold">Shipping Charges</h6>
                                        <h6 className="fw-semibold">$10</h6>
                                    </div>
                                </div>
                                <div className="card-footer border-secondary bg-transparent">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5 className="fw-bold">Total</h5>
                                        <h5 className="fw-bold">₹{total+10}</h5>
                                    </div>
                                    <button className="btn btn-block btn-dark my-3 py-2">Proceed To Checkout</button>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        </>
    )
}