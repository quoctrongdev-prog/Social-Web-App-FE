import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");

    } catch (error) {
      setError(error.response.data);
    }
  };
  console.log(error);

  return (
    <div className="flex h-screen items-center justify-center bg-[rgb(193,190,255)]">
      <div className="flex min-h-[400px] w-1/2 overflow-hidden rounded-[10px] bg-white">
        <div className="flex flex-1 flex-col justify-center gap-6 p-[50px]">
          <h1 className="text-3xl font-bold text-[#555] capitalize">Đăng ký</h1>
          <form action="" className="flex flex-col gap-[30px]">
            <input
              type="text"
              name="name"
              id="1"
              placeholder="Họ và tên"
              className="border-b-[1px] border-[#d3d3d3] px-2.5 py-5 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              id="2"
              placeholder="Tài Khoản"
              className="border-b-[1px] border-[#d3d3d3] px-2.5 py-5 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id="3"
              placeholder="email"
              className="border-b-[1px] border-[#d3d3d3] px-2.5 py-5 focus:outline-none"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              id="4"
              placeholder="Mật khẩu"
              className="border-b-[1px] border-[#d3d3d3] px-2.5 py-5 focus:outline-none"
              onChange={handleChange}
            />
            {error && <span className="text-red-500">{error}</span>}

            <button
              onClick={handleClick}
              className="cursor-pointer bg-[#938eef] p-2.5 font-bold text-white"
            >
              Đăng ký
            </button>
          </form>
        </div>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(39,11,96,0.5), rgba(39,11,96,0.5)), url('https://media.istockphoto.com/id/513550806/vi/anh/thi%E1%BA%BFu-ni%C3%AAn-hipster-b%E1%BA%A1n-b%C3%A8-ti%E1%BB%87c-t%C3%B9ng-b%E1%BA%B1ng-c%C3%A1ch-th%E1%BB%95i-confetti-%C4%91%E1%BA%A7y-m%C3%A0u-s%E1%BA%AFc-t%E1%BB%AB-tay.jpg?s=1024x1024&w=is&k=20&c=vO5zkYL9ZNs2Wm1p7q4BQI80N8QnXERsXQ1KzxX98oA=')`,
          }}
          className="flex flex-1 flex-col gap-[14px] bg-cover bg-center p-[50px] text-white"
        >
          <h1 className="overflow-hidden text-[70px] leading-[70px] font-bold capitalize">
            Facebook
          </h1>{" "}
          <br />
          <span className="text-[15px] font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime aut
            cumque fuga, ea dignissimos repellendus
          </span>
          <br />
          <span className="text-[14px]">Đã có tài khoản ?</span>
          <Link to="/login">
            <button className="w-1/2 cursor-pointer border-0 bg-white p-2.5 font-bold text-purple-500">
              Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
