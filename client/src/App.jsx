import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {


  return (
      <div className="flex min-h-screen  items-center flex-col overflow-hidden">
        <Navbar/>
          <Routes>
              <Route path="/" element={<Home/>} />
          </Routes>

      </div>
  )
}

export default App
