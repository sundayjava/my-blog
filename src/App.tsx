import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import NewsDetails from "./pages/NewsDetails";
import Footer from "./components/Footer";
import AdminCreatePost from "./Admin/pages/AdminCreatePost";

function App() {
  return (
    <div>
      <Navbar />
      <div className="lg:mx-52 bg-white pt-16">
        <div className="lg:px-3 px-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/admin" element={<AdminCreatePost />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
