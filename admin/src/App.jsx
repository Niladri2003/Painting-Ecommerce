
import {Route,Routes} from "react-router-dom";
// import Home from "./Pages/Home.jsx";
// import {Signup} from "./Pages/Signup.jsx";
import {Login} from "./Pages/Login.jsx";

import Dashboard from "./Pages/Dashboard.jsx";
import AccountDashboard from "./component/Dashboard/AccountDashboard.jsx";
import Notification from "./component/Dashboard/Notification.jsx";
import GalleryCoverImages from "./component/Dashboard/GalleryCoverImages.jsx";
import PrivateRoute from "./component/Auth/PrivateRoute.jsx";
import CouponUploader from "./component/Dashboard/CouponUploader.jsx";
import ContactUs from "./component/Dashboard/ContactUs.jsx";
import ProductUpload from "./component/Dashboard/ProductUpload.jsx";
import {Home} from "lucide-react";
import NotFound from "./Pages/NotFound.jsx";
import Products from "./component/Dashboard/Products.jsx";
import Orders from "./component/Dashboard/Orders.dashboard.jsx";
import AdminOrderDetails from "./component/Dashboard/MoreDetailsAboutOrder.jsx";



function App() {



  return (

     <div className="flex min-h-screen  flex-col items-center  overflow-hidden ">
         <Routes>
             <Route path="/" element={<Login/>} />
             <Route path="*" element={<NotFound/>} />
             {/*<Route path="/signup" element={<Signup/>} />*/}
             {/*<Route path="/login" element={<Login/>} />*/}
            {/*Dashboard Links*/}
             <Route element={
                 <PrivateRoute>
                 <Dashboard/>
                 </PrivateRoute>
             }>
                 <Route path="dashboard/account-dashboard" element={<AccountDashboard />} />
                 <Route path="dashboard/notification" element={<Notification/>} />
                 <Route path="dashboard/gallery-cover-images" element={<GalleryCoverImages/>} />
                 <Route path="dashboard/coupon" element={<CouponUploader/>} />
                 <Route path="dashboard/service-uploader" element={<ProductUpload/>} />
                 <Route path="dashboard/contact-us" element={<ContactUs/>} />
                 <Route path="dashboard/all-products" element={<Products/>} />
                 <Route path="dashboard/all-orders" element={<Orders/>} />
                 <Route path="dashboard/admin-order-details/:orderTrack" element={<AdminOrderDetails/>} />
             </Route>
         </Routes>
     </div>


  )
}

export default App
