import { BrowserRouter , Routes , Route} from "react-router-dom";
import { Footer } from "./component/footer";
import { Header } from "./component/header";
import { Cart } from "./container/cart";
import { Home } from "./container/home";
import { Register } from "./container/register";
import { SingleProduct } from "./container/singleproduct";
import { UserLogin } from "./container/userlogin";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/userlogin" element={<UserLogin/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/singleProduct/:productID" element={<SingleProduct/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
