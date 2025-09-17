import React, { useContext, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
// import profile from "../../../public/upload/profile.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);
  
  return (
    //do z-999 là lớn nhất nên nó nổi lên trên bg tối khi mở popup
    <div className="sticky top-0 flex h-[50px] 
    items-center justify-between border-b-[1px] 
    border-[#d3d3d3] bg-white px-2.5 py-2.5
    z-999">
      <div className="flex items-center gap-[30px]">
        <Link to="/" className="">
          <span className="text-[20px] font-bold text-[#00008b]">Facebook</span>
        </Link>
        <HomeOutlinedIcon />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className="flex items-center gap-2.5 rounded-[5px] border-[1px] border-[#d3d3d3] p-[5px]">
          <SearchOutlinedIcon />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="hidden w-[500px] focus:outline-none sm:block"

          />
        </div>
      </div>
      <div className="items-center gap-[20px] hidden sm:flex">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div  onClick={() => setOpenMenu(!openMenu)} 
        className="flex items-center gap-2.5 font-bold cursor-pointer">
          <img
            className="h-[30px] w-[30px] rounded-[50%] object-cover"
            src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/public/upload/profile.png"}
            alt=""
          />
          {/* {console.log(currentUser.profilePic)
          } */}
          <span >{  currentUser.name}</span>
        </div>

         {/* Dropdown menu */}
        {openMenu && (
          <div className="absolute right-0 top-[40px] w-[150px] rounded-md border bg-white shadow-md border-none my-element">
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={logout}
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
