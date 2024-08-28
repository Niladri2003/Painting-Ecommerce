import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home.jsx"));
const Navbar = lazy(() => import("./components/Navbar/Navbar.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const ProductCheckout = lazy(() => import("./pages/ProductCheckout.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const ScrollTop = lazy(() => import("./components/helper/ScrollTop.jsx"));
const Cart = lazy(() => import("./pages/CartPage.jsx"));
const Footer = lazy(() => import("./components/footer/Footer.jsx"));
const Account = lazy(() => import("./pages/Account.jsx"));
const AuthCallback = lazy(() => import("./pages/AuthCallback.jsx"));
const Buynow = lazy(() => import("./pages/BuyNow.jsx"));
const ExtraProducts = lazy(() => import("./pages/ExtraProducts.jsx"));
const Addresses = lazy(() => import("./components/Dashboard/Addresses.jsx"));
const Orders = lazy(() => import("./components/Dashboard/Orders.jsx"));
const ChangePassword = lazy(() => import("./components/Dashboard/ChnagePassword.jsx"));
const DeleteAccount = lazy(() => import("./components/Dashboard/DeleteAccount.jsx"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy.jsx"));
const ProductList = lazy(() => import("./pages/ProductList.jsx"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.jsx"));
const Loader = lazy(() => import("./components/Loader.jsx"));
const OrderDetails =lazy(()=>import("./components/Dashboard/OrderDetails.jsx"));

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="flex min-h-screen  items-center flex-col overflow-hidden">
      <Suspense fallback={<Loader />}>
        <Navbar />
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/extraproducts/:id" element={<Shop />} />
          <Route path="/shop" element={<ExtraProducts />} />
          <Route path="/product/:id" element={<ProductCheckout />} />

          <Route
            element={<ProtectedRoute isAuthenticated={user ? false : true} />}
          >
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path={"/product-list"} element={<ProductList />} />

          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/account" element={<Account />}>
              <Route path="delivery-address" element={<Addresses />} />
              <Route path="orders" element={<Orders />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="delete-account" element={<DeleteAccount />}/>
              <Route path="order-details/:orderTrack" element={<OrderDetails/>}/>

            </Route>
            <Route path="/buynow" element={<Buynow />} />
          </Route>

          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
        </Routes>
        <Footer />
      </Suspense>

    </div>
  );
}

export default App;

// import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Contact from "./pages/Contact.jsx";
// import About from "./pages/About.jsx";
// import Shop from './pages/Shop.jsx';
// import ProductCheckout from "./pages/ProductCheckout.jsx";
// import SignUp from "./pages/SignUp.jsx";
// import SignIn from "./pages/SignIn.jsx";
// import ScrollTop from "./components/helper/ScrollTop.jsx";
// import Cart from "./pages/CartPage.jsx";
// import Footer from "./components/footer/Footer.jsx";
// import Account from "./pages/Account.jsx";
// import AuthCallback from "./pages/AuthCallback.jsx";
// import Buynow from "./pages/BuyNow.jsx";
// import ExtraProducts from "./pages/ExtraProducts.jsx";
// import Addresses from "./components/Dashboard/Addresses.jsx";
// import Orders from "./components/Dashboard/Orders.jsx";
// import ChangePassword from "./components/Dashboard/ChnagePassword.jsx";
// import DeleteAccount from "./components/Dashboard/DeleteAccount.jsx";
// import ReturnPolicy from "./pages/ReturnPolicy.jsx";

// function App() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Check if the current path is the Home page
//   const isHomePage = location.pathname === "/";

//   // Function to handle the click event and navigate to the Shop page
//   const handleBannerClick = () => {
//     navigate("/shop");
//   };

//   return (
//     <div className="flex min-h-screen items-center flex-col overflow-hidden">
//       {/* Coupon Section - Only displayed on Home page */}
//       {isHomePage && (
//         <div
//           className="w-full bg-blue-500 text-white text-center p-4 cursor-pointer"
//           onClick={handleBannerClick}
//         >
//           <p>Use code <strong>SAVE10</strong> to get 10% off on your first purchase! Click here to shop now.</p>
//         </div>
//       )}

//       <Navbar />
//       <ScrollTop />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/contact-us" element={<Contact />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/extraproducts/:id" element={<Shop />} />
//         <Route path="/shop" element={<ExtraProducts />} />
//         <Route path="/product/:id" element={<ProductCheckout />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin"  element={<SignIn />}  />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/account" element={<Account />}>
//           <Route path="delivery-address" element={<Addresses />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="change-password" element={<ChangePassword />} />
//           <Route path="delete-account" element={<DeleteAccount />} />
//         </Route>
//         <Route path="/auth/callback" element={<AuthCallback />} />
//         <Route path="/buynow" element={<Buynow />} />
//         <Route path="/return-policy" element={<ReturnPolicy />} />
//       </Routes>

//       <Footer />
//     </div>
//   );
// }

// export default App;
