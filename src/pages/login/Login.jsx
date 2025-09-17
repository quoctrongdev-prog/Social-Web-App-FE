import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  //Function cho mấy cái inputs
   const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
  }
  //Function cho button đăng nhập, đăng ký tương tự
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      console.log(error);
      
      setError(error.response.data);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[rgb(193,190,255)]">
      <div className="flex min-h-[400px] w-1/2 overflow-hidden rounded-[10px] bg-white">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(39,11,96,0.5), rgba(39,11,96,0.5)), url('https://media.istockphoto.com/id/643137108/vi/anh/nh%C3%B3m-ng%C3%A2y-ng%E1%BA%A5t-th%C6%B0%E1%BB%9Fng-th%E1%BB%A9c-b%E1%BB%AFa-ti%E1%BB%87c.jpg?s=1024x1024&w=is&k=20&c=25HuHZbaNXf4UAbLpihMPhLYqbMbCH7cQTLRxSSjgok=')`,
          }}
          className="flex flex-1 flex-col gap-[14px] bg-cover bg-center p-[50px] text-white"
        >
          <h1 className="overflow-hidden text-[70px] leading-[70px] font-bold capitalize">
            Hello World
          </h1>{" "}
          <br />
          <span className="text-[15px] font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime aut
            cumque fuga, ea dignissimos repellendus
          </span>
          <br />
          <span className="cursor-pointer text-[14px]">
            Không có tài khoản ?
          </span>{" "}
          <br />
          <Link to="/register">
            <button className="w-1/2 cursor-pointer border-0 bg-white p-2.5 font-bold text-purple-500">
              Đăng ký
            </button>
          </Link>
          <br />
        </div>
        <br />
        <div className="flex flex-1 flex-col justify-center gap-6 p-[50px]">
          <h1 className="text-3xl font-bold text-[#555] capitalize">
            Đăng nhập
          </h1>
          <form action="" className="flex flex-col gap-[30px]">
            <input
              type="text"
              name="username"
              id=""
              placeholder="Tài khoản"
              className="border-b-[1px] border-b-[#d3d3d3] px-2.5 py-5 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id=""
              placeholder="Mật khẩu"
              className="border-b-[1px] border-b-[#d3d3d3] px-2.5 py-5 focus:outline-none"
              onChange={handleChange}

            />
            {error && <span className="text-red-500">{error}</span>}
            <button
              className="cursor-pointer bg-[#938eef] p-2.5 font-bold text-white"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
