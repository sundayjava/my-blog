import { Close, Email } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AuthModal from "../pages/Auth/AuthModal";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { Avatar, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  useEffect(() => {
    if (auth.currentUser) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.currentUser]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        handleProfileClose();
      })
      .catch((_error) => {
        alert("something went wrong");
      });
  };

  const profileNav = () => {
    // navigate("/profile");
    alert('Not supported for now')
    handleProfileClose();
  };

  return (
    <div className="bg bg-gray-900 text-white flex justify-center items-center lg:px-52 px-5 py-2 fixed w-full z-10">
      <div className="flex justify-between items-center w-full">
        <div className="lg:hidden" onClick={() => setToggle((prev) => !prev)}>
          {!toggle ? <MenuIcon /> : <Close />}
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
          {auth.currentUser ? (
            <div className="lg:block hidden cursor-pointer">
              <Avatar
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                alt="Remy Sharp"
                src={`${auth.currentUser.photoURL}`}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleProfileClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={profileNav}>My account</MenuItem>
                <MenuItem onClick={signout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <button
              className="bg-yellow-600 lg:block hidden text-[15px] px-4 py-1 rounded-md"
              onClick={handleOpen}
            >
              Login
            </button>
          )}
          <button className="bg-yellow-500 text-[15px] px-4 py-1 rounded-md lg:block hidden">
            Subscribe
          </button>
          {/* <div className=" cursor-pointer" onClick={()=>navigate("/search")}>
          <Search/>
          </div> */}
          {auth.currentUser ? (
            <div className="lg:hidden text-[15px] px-4 py-1 rounded-md cursor-pointer">
              <Avatar alt="Remy Sharp" src={`${auth.currentUser.photoURL}`} />
            </div>
          ) : (
            <button
              className="bg-yellow-600 lg:hidden text-[15px] px-4 py-1 rounded-md"
              onClick={handleOpen}
            >
              Login
            </button>
          )}
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
