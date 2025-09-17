import React, { useContext, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios"; 
import { useLocation } from "react-router-dom";
// import profile from "../../../public/upload/profile.png";
// import cover from "../../../public/upload/background.jpg";
import Update from "../../components/update/Update";

const Profile = () => {
  
  
  const [open, setOpen] = useState(false);
                             //Lấy id trên đường dẫn url hiện tại 
                             // theo profile (pathname) 
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  
  const { currentUser } = useContext(AuthContext);
  //Lấy dữ liệu id user
  const { isLoading, error, data } = useQuery({
  queryKey: ["[user]", userId],
  queryFn: () => makeRequest.get("/users/find/" + userId).then((res) => res.data),
  enabled: !!userId, // chỉ chạy khi có userId
  // !! cách viết tắt trong JS để ép một giá trị thành true hoặc false
  // !!userId = 3 -> true, !!userId = null,... -> false
});
//Lấy dữ liệu follower
const {  isLoading: rIsLoading, data: relationshipsData } = useQuery({
  queryKey: ["relationship"],
  queryFn: () => makeRequest.get("/relationships?followedUserId=" + userId).then((res) => res.data),
  
});
  // console.log(data);
// console.log(relationshipsData);

//Mutation follow
   const queryClient = useQueryClient();
   const mutationLike = useMutation({
        mutationFn: (following) => {                           //req.query.userId theo url
          if(following) return makeRequest.delete("/relationships?userId=" + userId )
          return makeRequest.post("/relationships", {userId}) },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["relationship"] });
        },
      }); 

   const handleFollow = () => {
      mutationLike.mutate(relationshipsData.includes(currentUser.idusers))
    }



  //phải thêm các trường hợp dữ liệu chưa kịp load xong
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Đã xảy ra lỗi.</div>;
  if (!data) return <div>Không có dữ liệu người dùng.</div>;
  return (
    <div className="rounded-2xl bg-gray-100">
      <div className="relative sm:h-[300px] sm:w-[100%] h-[300px] w-[500px] sm:m-auto ml-15">
        <img
          className="h-[100%] w-[100%] object-cover"
          src={data.coverPic ? "/upload/"+data.coverPic : "/public/upload/background.jpg"}
          //src={currentUser.coverPic}


          alt=""
        />
        <img
          className="absolute top-[200px] right-0 left-0 m-auto h-[200px] w-[200px] rounded-[50%] object-cover"
          src={data.profilePic ? "/upload/"+data.profilePic : "/public/upload/profile.png"}
          alt=""
        />
       
      </div>
      <div className="px-[70px] py-[20px] ">
        <div className="my-element flex h-[315px] items-center gap-1.5 rounded-[20px] bg-white p-[40px] mb-[25px]">
          <div className="flex flex-[1] justify-start gap-3.5">
            <a href="http://facebook.com">
              <FacebookIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <XIcon fontSize="large" />
            </a>
          </div>
          <div className="flex flex-[1.5] flex-col 
          items-center justify-center gap-2.5
          ">
            <span className="flex w-[100%] justify-center text-[25px] font-medium">
             {data.name}
            </span>
            <div className="flex w-[100%] items-center justify-between">
              <div className="flex gap-0.5">
                <PlaceIcon />
                <span className="text-[15px] font-medium">
                  {data.city}
                </span>
              </div>
              <div className="flex gap-0.5">
                <LanguageIcon />
                <span className="text-[15px] font-medium">{data.website}</span>
              </div>
            </div>
           {rIsLoading ? "loading" : userId === currentUser.idusers ? (<button className="cursor-pointer rounded-[5px]
             bg-[#5271ff] px-5 py-2.5 text-[white] 
             " onClick={()=>setOpen(true)}>
              Cập nhật
            </button>) : <button onClick={handleFollow}
            className="cursor-pointer rounded-[5px]
             bg-[#5271ff] px-5 py-2.5 text-[white]
             ">
              {relationshipsData.includes(currentUser.idusers) ? "Đang theo dõi" 
              : "Theo dõi"}
            </button>}
          </div>
          <div className="flex flex-[1] justify-end gap-2.5">
            <EmailIcon />
            <MoreVertIcon />
          </div>
        </div>
        {/* truyền userId qua cho component Posts */}
      <Posts userId={userId}/>
      </div>
    { open && <Update setOpen={setOpen} user={data}/>}
    </div>
  );
};

export default Profile;
