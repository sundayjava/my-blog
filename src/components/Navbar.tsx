import { Close, Email, Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AuthModal from "../pages/Auth/AuthModal";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  useEffect(() => {
    // if (auth.user) {
    //   handleClose();
    // }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [
    // auth.user
  ]);

  return (
    <div className="bg bg-gray-900 text-white flex justify-center items-center lg:px-52 px-5 py-2 fixed w-full z-10">
      <div className="flex justify-between items-center w-full">
        <div className="lg:hidden" onClick={() => setToggle((prev) => !prev)}>
         {!toggle ? <Menu /> : <Close/>}
        </div>
        <div className="cursor-pointer lg:flex hidden">
          <a className="cursor-pointer hover:underline mr-5">
            Subscribe To Newsletters
          </a>
          <Email sx={{ cursor: "pointer" }} />
        </div>
        <h1 className="text-yellow-500 font-bold text-[24px] uppercase">
          Newstopedia
        </h1>
        <div className="flex justify-between items-center gap-8">
          <button className="bg-yellow-500 text-[15px] px-4 py-1 rounded-md lg:block hidden" onClick={handleOpen}>Login</button>
          <button className="bg-yellow-500 text-[15px] px-4 py-1 rounded-md lg:block hidden">
            Subscribe
          </button>
          {/* <div className=" cursor-pointer" onClick={()=>navigate("/search")}>
          <Search/>
          </div> */}
          <button className="bg-yellow-600 lg:hidden text-[15px] px-4 py-1 rounded-md" onClick={handleOpen}>
          Login
        </button>
        </div>
      </div>
      <div
        className={`absolute left-0 top-10 bg-gray-900 border-t px-10 py-7 w-full ${
          toggle ? "flex flex-col" : "hidden"
        }`}
      >
        <button className="bg-yellow-600 text-[15px] mb-5 px-4 py-1 rounded-md">
          Subscribe
        </button>
        
      </div>
      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
};

export default Navbar;
