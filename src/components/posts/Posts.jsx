import React from "react";
import Post from "../post/Post";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],                    //lấy và gửi id qua cho BE
                                            //và sử dụng req.query.userId
    queryFn: () => makeRequest.get("/posts?userId="+userId).then((res) => res.data),
  });

  // console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Đã xảy ra lỗi.</div>;
  if (!data) return <div>Không có dữ liệu.</div>;

  return (
    <div className="flex flex-col gap-[50px] p-4">
      {data.map((i) => (
        <Post post={i} key={i.idposts} />
      ))}
    </div>
  );
};

export default Posts;
