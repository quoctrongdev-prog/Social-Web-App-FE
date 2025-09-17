import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {useQuery,useMutation,QueryClient,useQueryClient,} from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
// import profile from "../../../public/upload/profile.png";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");


  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    //file và desc
    mutationFn: (newComment) => makeRequest.post("comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
     if (!desc.trim()) {
    setErrorMsg("Không được để trống bình luận.");
       setTimeout(() => {
            setErrorMsg("");
          }, 2500);
    //return để ngừng thực hiện hàm tiếp theo
    //tránh trống bình luận vẫn gửi đi      
    return;
  }
    mutation.mutate({ desc, postId });
    setDesc("");
    setErrorMsg("");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Đã xảy ra lỗi.</div>;
  if (!data) return <div>Không có dữ liệu.</div>;

  return (
    <div>
      <div className="mx-0 my-[20px] flex items-center justify-between gap-5">
        <img
          src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/public/upload/profile.png"}
          alt=""
          className="h-[40px] w-[40px] rounded-[50%] object-cover"
        />
        <input
          className="flex flex-[5] items-center justify-center border-[1px] border-gray-500 bg-transparent p-1.5 text-black"
          type="text"
          placeholder="Viết bình luận"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="cursor-pointer rounded-[3px] bg-[#5271ff] p-[8px] text-white"
        >
          Gửi
        </button>
      </div>
        {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      {data.map((i) => (
        <div className="mx-0 my-[30px] flex items-center justify-between">
          <div className="flex flex-[5] items-center justify-center gap-2.5">
            <img
              src={i.profilePic ? "/upload/" + i.profilePic : "/public/upload/profile.png"}
              alt=""
              className="h-[40px] w-[40px] rounded-[50%] object-cover"
            />
            <div className="flex flex-col justify-center">
              <span className="font-medium">{i.name}</span>
              <p>{i.desc}</p>
            </div>
            <span className="mr-10 flex flex-[1] justify-end text-[12px] text-gray-500">
              {moment(i.createdAt).fromNow()}{" "}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
