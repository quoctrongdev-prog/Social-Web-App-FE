import React, { useContext, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link, useLocation } from "react-router-dom";
import Comments from "../comments/Comments";
import moment from "moment";
// import profile from "../../../public/upload/profile.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import UpdatePost from "../updatepost/UpdatePost";

const Post = ({ post }) => {
  const [errorDel, setErrorDel] = useState(null);
  const { isLoading, error, data } = useQuery({
    queryKey: ["like", post.idposts],
    queryFn: () =>
      makeRequest.get("/like?postId=" + post.idposts).then((res) => res.data),
    enabled: !!post.idposts,
  });
  // console.log(data);
  // console.log(post.idposts);

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  // const liked = true;
  const queryClient = useQueryClient();

  //Xóa post
  const deleteMutation = useMutation({
    mutationFn: (postId) => makeRequest.delete("/posts/" + postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(post.idposts,{
      //Hàm onError sẽ được gọi nếu gọi api thất bại hoặc lỗi
        onError: (err) => {
          // Nếu server trả về lỗi 403
          if (err?.response?.status === 403) {
            setErrorDel("Bạn chỉ có thể xóa bài viết của chính mình!");
          } else {
            setErrorDel("Đã xảy ra lỗi khi xóa bài viết.");
          }
              // Sau 3 giây thì xóa thông báo lỗi
          setTimeout(() => {
            setErrorDel("");
          }, 2500);
          },
    });
    // console.log("đang xóa bv", post.idposts);
  };

  //Load số lượng comment theo bài viết theo query id
  const { isLoading: loadingComments,error: errorComments,data: 
    dataComments,} = useQuery({
    queryKey: ["comments", post.idposts],
    queryFn: () =>
      makeRequest
        .get("/comments?postId=" + post.idposts)
        .then((res) => res.data),
    enabled: !!post.idposts,
  });
  // console.log(dataComments);

  //Mutation like
  const mutationLike = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/like?postId=" + post.idposts);
      //Được lưu dưới field postId
      //cho trùng với dữ liệu
      //vì post.idposts là qua props
      return makeRequest.post("/like", { postId: post.idposts });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
  });

  const handleLike = () => {
    mutationLike.mutate(data.includes(currentUser.idusers));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Đã xảy ra lỗi.</div>;
  if (!data) return <div>Không có dữ liệu.</div>;

  return (
    <div className="my-element rounded-[20px] bg-white">
      <div className="p-[20px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <img
              src={
                post.profilePic
                  ? "/upload/" + post.profilePic
                  : "/public/upload/profile.png"
              }
              alt=""
              className="h-[40px] w-[40px] rounded-[50%] object-cover"
            />
            <div className="flex flex-col">
              <Link to={`/profile/${post.userId}`}>
                <span className="font-medium">{post.name}</span>
              </Link>
              <span className="text-[12px] text-gray-500">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
           {errorDel && ( 
                  <div className="text-red-500 text-md ml-20 ">
                      {errorDel}
                    </div>
                  )}
          <div className="relative flex flex-col items-center">
            <MoreHorizIcon
              className="cursor-pointer"
              onClick={() => setDeleteOpen(!deleteOpen)}
              />
             
            {/* Button xóa */}
            {deleteOpen && (
              <div className="my-element absolute top-6 right-0 z-10 flex h-[80px] w-[150px] flex-col items-center justify-center rounded-[10px] border-[1px] border-none border-gray-500 bg-white">
                <button
                  className="w-full cursor-pointer rounded-[10px] px-4 py-2 text-center hover:bg-gray-200"
                  onClick={handleDelete}
                >
                  Xóa
                </button>
              
                {/* div chỉnh sửa bài viết */}
                <div className="hover:bg-gray-200 w-full rounded-[10px] text-center " >
                  <button className="cursor-pointer py-1.5 "
                  onClick={() => setUpdateOpen(!updateOpen)}>
                    Chỉnh sửa
                  </button>
                  {updateOpen && (
                    <UpdatePost
                      post={post}
                      setUpdateOpen={setUpdateOpen}
                      setDeleteOpen={setDeleteOpen}
                    />
                  )}
                </div>
                
              </div>
            )}
          </div>
        </div>
        <div className="mx-0 my-[20px]">
          <p>{post.desc}</p>
          <img
            src={"/upload/" + post.img}
            alt=""
            className="mt-[20px] h-[500px] w-[100%] object-cover"
          />
        </div>
        <div className="flex items-center justify-around gap-[20px]">
          <div className="flex cursor-pointer items-center gap-[10px] text-[14px]">
            {data.includes(currentUser.idusers) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data.length} Thích
          </div>
          <div
            onClick={() => setCommentOpen(!commentOpen)}
            className="flex cursor-pointer items-center gap-[10px] text-[14px]"
          >
            <TextsmsOutlinedIcon />
            {dataComments?.length || 0} Bình Luận
            {/* {console.log(data)} */}
          </div>
          <div className="flex cursor-pointer items-center gap-[10px] text-[14px]">
            <ShareOutlinedIcon />
            12 Lượt chia sẻ
          </div>
        </div>
        {commentOpen && (
          <Comments postId={post.idposts} key={dataComments.idcomments} />
        )}
        {/* {console.log(post.idposts)} */}
      </div>
    </div>
  );
};

export default Post;
