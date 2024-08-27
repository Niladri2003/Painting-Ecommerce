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
import ExtraProducts from "./pages/ExtraProducts.jsx";
import Addresses from "./components/Dashboard/Addresses.jsx";
import Orders from "./components/Dashboard/Orders.jsx";
import ChangePassword from "./components/Dashboard/ChnagePassword.jsx";
import DeleteAccount from "./components/Dashboard/DeleteAccount.jsx";
import ReturnPolicy from "./pages/ReturnPolicy.jsx";
import ProductList from "./pages/ProductList.jsx";

function App() {

  return (
    <div className="flex min-h-screen  items-center flex-col overflow-hidden">
      <Navbar />
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/extraproducts/:id" element={<Shop />} />
        <Route path="/shop" element={<ExtraProducts />} />
        <Route path="/product/:id" element={<ProductCheckout />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin"  element={<SignIn />}  />
        <Route path="/cart" element={<Cart />} />
        <Route path={'/product-list'} element={<ProductList/>} />

        <Route path="/account" element={<Account />}>
          <Route path="delivery-address" element={<Addresses />} />
          <Route path="orders" element={<Orders />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="delete-account" element={<DeleteAccount />} />

        </Route>

        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/buynow" element={<Buynow />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
