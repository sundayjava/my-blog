import { Close, Email, Menu, Search } from "@mui/icons-material";
import { useState } from "react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

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
        <h1 className="text-yellow-600 font-bold text-[24px] uppercase">
          Newstopedia
        </h1>
        <div className="flex justify-between items-center gap-8">
          <button className="bg-yellow-600 text-[15px] px-4 py-1 rounded-md lg:block hidden">
            Subscribe
          </button>
          <button className="text-[15px] lg:block hidden">Login</button>
          <Search sx={{ cursor: "pointer" }} />
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
        <button className="bg-yellow-600 text-[15px] px-4 py-1 rounded-md ">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
