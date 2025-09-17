import React, { useState, useContext } from "react";
import { makeRequest } from "../../axios";
import { useMutation, QueryClient, useQueryClient,} from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
const UpdatePost = ({ setUpdateOpen, setDeleteOpen, post }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [errorUd, setErrorUd] = useState(null);
  const [text, setText] = useState({
    desc: post.desc || "",
  });
  const [img, setImg] = useState(null);

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
  //Nhận dữ liệu từ input người dùng nhập vào
  const handleChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //Update dữ liệu bài viết sang BE lên database
  const queryClient = useQueryClient();
const mutation = useMutation({                    //truyền id và dữ liệu bài viết 
                                                  // nên cần 2 cái
                                                  //+ là thành 1 chuỗi
                                                  // còn , là thành 
                                                  // 2 phần riêng biệt
    mutationFn: (updatePost) => makeRequest.patch("/posts/" + updatePost.idposts, updatePost),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setUpdateOpen(false);
      setDeleteOpen(false);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgPost = post.img;

    imgPost = img ? await upload(img) : post.img;
                  //Cập nhật lại desc và img lên database 
    mutation.mutate({ idposts: post.idposts, ...text, img: imgPost },{
       onError: (err) => {
          // Nếu server trả về lỗi 403
          if (err?.response?.status === 403) {
            setErrorUd("Bạn chỉ có thể cập nhật bài viết của chính mình!");
          } else {
            setErrorUd("Đã xảy ra lỗi khi xóa bài viết.");
          }
              // Sau 3 giây thì xóa thông báo lỗi
          setTimeout(() => {
            setErrorUd("");
          }, 2500);
          },
  });
    
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative h-[50%] w-[50%] rounded-lg bg-white p-[50px] shadow-lg">
        <form onSubmit={handleClick} className="flex flex-col gap-y-2">
          <h2 className="text-center text-2xl font-medium">Chỉnh sửa bài viết</h2>
          
          <div className="flex gap-8 py-7">
            <span>Ảnh :</span>
            <input type="file" onChange={(e)=>setImg(e.target.files[0])}/>
          </div>
        
          <input
            className="border-b-[1px] border-b-[#d3d3d3] px-2.5 py-2 focus:outline-none"
            type="text"
            value={text.desc}
            name="desc"
            onChange={handleChange}
          />
          <div className="flex items-center justify-center mt-12">
            <button 
            type="submit"
            
            className="w-[25%] cursor-pointer rounded-[5px] bg-[#5271ff] px-5 py-2.5 text-[white]">
              Cập nhật
            </button>
          </div>
             {errorUd && ( 
                  <div className="text-red-500 text-md text-center ">
                      {errorUd}
                    </div>
                  )}
        </form>
        <button
        type="button"
          className="absolute top-3 right-5 cursor-pointer hover:text-gray-600"
          onClick={() => {
            setUpdateOpen(false);
            setDeleteOpen(false);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
