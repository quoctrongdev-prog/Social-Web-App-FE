import React, { useState, useContext } from "react";
import { makeRequest } from "../../axios";
import {useMutation,QueryClient,useQueryClient} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
const Update = ({ setOpen, user }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [text, setText] = useState({
   name: user.name || "",
   city: user.city || "",
   website: user.website || "",
  });
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    
    mutationFn: (user) => makeRequest.patch("users", user),
    onSuccess: (_, variables) => {
      setCurrentUser({ ...currentUser, ...variables });
      queryClient.invalidateQueries({ queryKey: ["[user]"] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPic;
    let profileUrl = user.profilePic;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

                              //tên db : biến
    mutation.mutate({ ...text, coverPic: coverUrl, profilePic: profileUrl });
    setOpen(false);
  };

  return (
   <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50">
     <div className="relative h-[80%] w-[50%] bg-white p-[50px] rounded-lg shadow-lg">
      <form action="" className="flex flex-col gap-y-2">
        <h2 className="text-2xl text-center font-medium">Cập nhật hồ sơ</h2>
        <hr className="text-gray-400 mt-3 mb-3" />
        <div className="flex gap-8">
        <span>Ảnh bìa :</span>
        <input type="file" onChange={(e)=>setCover(e.target.files[0])}/></div>
        <div className="flex gap-3.5">
          <span>Ảnh hồ sơ :</span>
        <input type="file" onChange={(e)=>setProfile(e.target.files[0])}/></div>
        <span>Tên :</span><input className="border-b-[1px] border-b-[#d3d3d3] px-2.5 py-2 focus:outline-none" type="text" value={text.name}  name="name" onChange={handleChange} />
       <span>Quốc Gia :</span> <input className="border-b-[1px] border-b-[#d3d3d3] px-2.5 py-2 focus:outline-none" type="text" value={text.city}  name="city" onChange={handleChange} />
       <span>Website :</span> <input className="border-b-[1px] border-b-[#d3d3d3] px-2.5 py-2 focus:outline-none" type="text" value={text.website}  name="website" onChange={handleChange} />
         <div className="flex items-center justify-center">
          <button onClick={handleClick}
        className="rounded-[5px]
             bg-[#5271ff] px-5 py-2.5 mt-12 text-[white] w-[25%] cursor-pointer">Cập nhật</button>
         </div>
        
      </form>
      <button
        className="absolute cursor-pointer top-3 right-5 hover:text-gray-600"
        onClick={() => {
          setOpen(false);
        }}
      >
        X
      </button>
    </div>
   </div>
  );
};

export default Update;
