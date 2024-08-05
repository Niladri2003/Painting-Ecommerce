import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Shop from './pages/Shop.jsx'
import ProductCheckout from "./pages/ProductCheckout.jsx";

function App() {


  return (
    <div className="flex min-h-screen  items-center flex-col overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/product/:id" element={<ProductCheckout />} />

      </Routes>

    </div>
  )
}

export default App
