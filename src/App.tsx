import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import NewsDetails from "./pages/NewsDetails";
import Footer from "./components/Footer";
import AdminLogin from "./Admin/pages/AdminLogin";
import DetectNetwork from "./Admin/components/DetectNetwork";

function App() {
  return (
    <div>
      <Navbar />
      <div className="lg:mx-52 bg-white pt-16">
        <div className="lg:px-3 px-1">
          <DetectNetwork>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/news/:id" element={<NewsDetails />} />
              <Route path="/admin" element={<AdminLogin />} />
            </Routes>
          </DetectNetwork>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
