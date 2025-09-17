import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        //Xem có dữ liệu user không getItem
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async(inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs,
            {   //Vì đang làm viec với cookie nên cần thêm thuộc tính này
                withCredentials: true, // Đảm bảo gửi cookie nếu có
            }); 
        //Dữ liệu từ api ở trên
        setCurrentUser(res.data);
       //Phải đăng nhập lại mới hiện được profilePic
        

    }

    const logout = async () => {
  await axios.post("http://localhost:8800/api/auth/logout", {}, { withCredentials: true });
  setCurrentUser(null);
  localStorage.removeItem("user");
};


    useEffect(() => {
        //Lưu dữ liệu người dùng vào localstorage setItem
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

   return(
    <AuthContext.Provider value={{currentUser, setCurrentUser, login, logout}} >
        {children}
    </AuthContext.Provider>
   )
   
};