import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import profile from "../../../public/upload/profile.png";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  //Dữ liệu giả
  const stories = [
    {
      id: 1,
      name: "Quốc Trọng",
      profile:
        "https://i1-giadinh.vnecdn.net/2016/05/17/hanhphuc-7943-1463451741.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=DieVLwh45WPmhkV65JsGbg",
    },
    {
      id: 2,
      name: "Quốc Trọng 2",
      profile:
        "https://i1-giadinh.vnecdn.net/2016/05/17/hanhphuc-7943-1463451741.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=DieVLwh45WPmhkV65JsGbg",
    },
    {
      id: 3,
      name: "Quốc Trọng 3",
      profile:
        "https://i1-giadinh.vnecdn.net/2016/05/17/hanhphuc-7943-1463451741.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=DieVLwh45WPmhkV65JsGbg",
    },
  ];
  return (
    <div className="h-[70px] rounded-[9px] bg-gray-100 p-5 sm:h-[100%]">
      <div className=" mb-[30px] flex  gap-2.5 sm:flex-none sm:w-[100%]">
        <div className="w-[80px] h-[80px] rounded-[50%] relative flex-[1] overflow-hidden  sm:rounded-[10px] sm:h-[200px] sm:w-[100%]">
          <img
            src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/public/upload/profile.png"}
            alt=""
            className="h-[100%] w-[100%] object-cover"
          />
          <span className="absolute bottom-2.5 left-2.5 hidden sm:block sm:font-medium sm:text-black">
            {currentUser.name}
          </span>
          <button className="absolute sm:top-[95px] 
          sm:right-[150px] flex h-[30px] w-[30px] cursor-pointer 
          items-center justify-center rounded-[50%] bg-[#5271ff] 
          text-[25px] text-white top-0 left-0 bottom-0 right-0 m-auto">
            +
          </button>
        </div>
        {/* Dùng {} thì phải return còn ko thì xài () khỏi return */}
        {stories.map((i) => (
          <div className="relative flex-[1] overflow-hidden rounded-[50%] sm:rounded-[10px]"
          key={i.id}>
            <img
              src={i.profile}
              alt=""
              className="h-[100%] w-[100%] object-cover"
            />
            <span className="absolute bottom-2.5 left-2.5 hidden sm:block sm:font-medium sm:text-white">
              {i.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
