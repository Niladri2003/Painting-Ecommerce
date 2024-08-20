import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Shop from './pages/Shop.jsx'
import ProductCheckout from "./pages/ProductCheckout.jsx";
import SignUp from "./pages/SignUp.jsx"
import SignIn from "./pages/SignIn.jsx";
import ScrollTop from "./components/helper/ScrollTop.jsx";
import Cart from "./pages/CartPage.jsx";
import Footer from "./components/footer/Footer.jsx";
import Account from "./pages/Account.jsx";
import AuthCallback from "./pages/AuthCallback.jsx";
import Buynow from "./pages/BuyNow.jsx"
function App() {


  return (
    <div className="flex min-h-screen  items-center flex-col overflow-hidden">
      <Navbar />
      <ScrollTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/product/:id" element={<ProductCheckout />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/account" element={<Account/>}/>
        <Route path="/auth/callback" element={<AuthCallback/>}/>
        <Route path="/buynow" element={<Buynow/>}/>
        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
