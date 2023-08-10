import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {

  let [category, setCategory] = useState();
  let [product, setProduct] = useState();

  useEffect(() => {

    //category data
    const getCategory = () => {

      fetch("http://localhost:3001/category").then(async (res) => {
        let record = await res.json();
        setCategory(record);
        // toast("Getting Category Record Successfully..")
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    getCategory();
  }, [setCategory])

  useEffect(() => {
    //product data
    const getProduct = () => {
      fetch("http://localhost:3001/product").then(async (res) => {
        let record = await res.json();
        setProduct(record);
        console.log(record);
        // toast("Getting Product Record Successfully..")
      }).catch((err) => {
        toast.error(err.message);
      })
    }
    getProduct();
  }, [setProduct])

  const getSubcategory = (id) => {
    // console.log(id);
    fetch("http://localhost:3001/product?categoryID=" + id,
      {
        method: "get",
        headers: { "Content-Type": "application/json" }
      })
      .then(async (res) => {
        let productCatWise = await res.json();
        console.log(productCatWise);
        setProduct(productCatWise)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <div>
        {/* banner */}
        <section className="banner wow animate__animated animate__fadeIn">
          <div id="image" className="carousel slide" data-bs-ride="true">
            <div className="carousel-inner">
              <div className="carousel-item position-relative">
                <div className="banner-layer">
                  <img src="https://avon-demo.myshopify.com/cdn/shop/files/dome2-bnr2_2000x.jpg?v=1614331333" alt="banner_2" width="100%" height="100%" />
                </div>
                <div className="carousel-caption text-dark banner-content top-50 start-50 translate-middle position-absolutse">
                  <h2 className="fw-bold">The Premium Collection Style For Everyone.</h2>
                  <a href="#" className="d-inline-block mt-3 px-4 py-3 b-button me-3 fw-semibold rounded-pill">
                    SHOP NOW
                  </a>
                </div>
              </div>
              <div className="carousel-item active">
                <div className="banner-layer">
                  <img src="https://avon-demo.myshopify.com/cdn/shop/files/dome1-bnr1_2000x.jpg?v=1614360791" alt="banner_3" width="100%" height="100%" />
                </div>
                <div className="carousel-caption text-dark banner-content top-50 start-50 translate-middle position-absolute">
                  <h2 className="fw-bold">Matching Style &amp; Class With Luxury Comfort.</h2>
                  <a href="#" className="d-inline-block mt-3 px-4 py-3  b-button me-3 position-relative fw-semibold rounded-pill">
                    SIGN UP NOW
                  </a>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#image" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#image" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
            </button>
          </div>
        </section>
        {/* masonary  */}
        <div className="masonary">
          <div className="title text-center py">
            <h3 className="fw-bold text-dark">Shop The Edit</h3>
            <p className="text-secondary">The easiest and fastest way to choose new!!</p>
          </div>
          <div className="container d-flex">
            <div className="col-xl-6 px-2">
              <div className="category-img my-3 ">
                <img src="https://avon-demo.myshopify.com/cdn/shop/files/womens-top_1200x.jpg?v=1614360791" />
                <div className="category-content">
                  <h5 className="fw-bold">WOMEN TOPS</h5>
                  <p className="fs-small fw-light">From World's Top Desigers</p>
                  <a href="#" className="b-button p-2">SHOP NOW</a>
                </div>
              </div>
              <div className="category-img">
                <img src="https://avon-demo.myshopify.com/cdn/shop/files/men-clothing_1200x.jpg?v=1614360791" />
                <div className="category-content">
                  <h5 className="fw-bold">MEN SHIRTS</h5>
                  <p className="fs-small fw-light">Up to 70% off on selected items</p>
                  <a href="#" className="b-button p-2">SHOP NOW</a>
                </div>
              </div>
            </div>
            <div className="col-6 px-2">
              <div className="category-img my-3">
                <img src="https://avon-demo.myshopify.com/cdn/shop/files/accesories_1200x.jpg?v=1614360791" />
                <div className="category-content">
                  <h5 className="fw-bold">ACCESSORIES</h5>
                  <p className="fs-small fw-light">Add finishing touch to your outfit</p>
                  <a href="#" className="b-button p-2">SHOP NOW</a>
                </div>
              </div>
              <div className="category-img">
                <img src="https://avon-demo.myshopify.com/cdn/shop/files/denim_9fbab35d-066b-4f9e-accb-96416f6594fd_1200x.jpg?v=1614360791" />
                <div className="category-content">
                  <h5 className="fw-bold">DENIM</h5>
                  <p className="fs-small fw-light">Find your perfect outfit. </p>
                  <a href="#" className="b-button p-2">SHOP NOW</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* portfolio */}
        <section className="container product py wow animate__animated animate__fadeInUp aimate_delay_3s">
          <div className="title text-center">
            <h3 className="fw-bold text-dark">Editor's Pick</h3>
            <p className="text-secondary">Shop our Editor's Picks for outfit inspiration and must-have looks</p>
          </div>
          <div className="wrap">
            <div className="gallery-wrap">
              <ul id="filters" className="clearfix d-flex justify-content-center py-3">
              <li><span className="active fw-normal">All Product</span></li>
                {category && category.map((v, i) => {
                  return (
                    <li><span className="fw-normal" onClick={() => getSubcategory(v.id)}>{v.category}</span></li>
                  )
                })}
              </ul>
              <div className="row">
                {product && product.map((pp, vp) => {
                  return (
                      <div class="col-md-3 py-5">
                          <img src={pp.image} alt className = "product-img img-fluid rounded-3"/>
                        <div className="text-center text-dark py-3">  
                          <h6 className="mt-2 fw-bold">{pp.name}</h6>
                            <p><span className="mx-1" style={{ color: '#f77575' }}>{pp.d_price}</span></p>
                            <Link to={"/singleProduct/"+pp.id} className="btn btn-light shadow b-btn" style={{"transform" : "translateY(-10px)"}}><i className="fa-solid fa-eye mx-2" />View Details</Link>
                        </div>
                      </div>
                  )
                })}
              </div>{/*/gallery*/}
            </div>{/*/gallery-wrap*/}
          </div>

        </section>
      </div>
      <ToastContainer />
    </>
  )
}