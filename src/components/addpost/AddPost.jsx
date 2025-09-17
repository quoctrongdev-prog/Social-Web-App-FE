import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import ImageIcon from "@mui/icons-material/Image";
import MapIcon from "@mui/icons-material/Map";
import GroupIcon from "@mui/icons-material/Group";
import {useMutation,QueryClient,useQueryClient} from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import profile from "../../../public/upload/profile.png";


const AddPost = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  //Hàm upload file lên server (upload ảnh lên server)
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    //file và desc
    mutationFn: (newPost) => makeRequest.post("posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = null;
    if (file) imgUrl = await upload();
    //img là cột trong db, imgUrl là tên file trả về
    //từ hàm upload
    //và gán cho img trong db
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="p-4 py-12 sm:py-3 sm:mb-3.5 ">
      <div className="my-element mx-0 my-1 sm:h-[187px] sm:w-[100%] overflow-hidden rounded-[20px] bg-white p-[6px]">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex flex-3 items-center gap-5 p-4">
              <img
                src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/public/upload/profile.png"}
                alt=""
                className="h-[40px] w-[40px] rounded-[50%] object-cover"
              />
              <div />
              <input
                type="text" // Chọn loại input phù hợp, ở đây là text
                className="flex h-[70px] w-full items-center rounded-[10px] border-[1px] border-[#d3d3d3] pl-3 text-gray-900 focus:outline-none"
                placeholder={`Bạn đang suy nghĩ điều gì ${currentUser.name}...`} // Đặt placeholder
                value={desc} // Truyền giá trị từ state vào
                onChange={(e) => setDesc(e.target.value)} // Cập nhật state khi thay đổi giá trị input
              />
            </div>
            <div className="mr-[30px] flex flex-1 justify-end">
              {file && (
                <img
                  className="flex h-[90px] w-[90px] justify-end rounded-[10px]"
                  src={URL.createObjectURL(file)}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="ml-3 flex gap-5 pb-1">
              <div>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <div
                  /* Kích hoạt click vào input file */
                  onClick={() => document.getElementById("file").click()}
                  className="flex cursor-pointer gap-1.5"
                >
                  <ImageIcon />
                  <span>Thêm ảnh</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <MapIcon />
                <span>Thêm vị trí</span>
              </div>
              <div className="flex gap-1.5">
                <GroupIcon />
                <span>Tag bạn bè</span>
              </div>
            </div>
            <div>
              <button
                onClick={handleClick}
                className="mr-5 cursor-pointer rounded-[5px] p-[5px] text-white last:bg-blue-600"
              >
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
