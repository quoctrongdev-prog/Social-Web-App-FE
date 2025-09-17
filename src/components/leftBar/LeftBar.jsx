import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Friends from '../../assets/1.png';
import Groups from '../../assets/2.png';
import Market from '../../assets/3.png';
import Watch from '../../assets/4.png';
import Memories from '../../assets/5.png';
import Events from '../../assets/6.png';
import Gaming from '../../assets/7.png';
import Gallery from '../../assets/8.png';
import Videos from '../../assets/9.png';
import Messages from '../../assets/10.png';
import Tutorials from '../../assets/11.png';
import Courses from '../../assets/12.png';
import Fund from '../../assets/13.png';
import {AuthContext} from '../../context/authContext'
// import profile from "../../../public/upload/profile.png";

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  
  return (
    <div className='hidden sm:block flex-[2] sticky top-[50px] h-[calc(100vh-70px)] overflow-scroll scrollbar-hide bg-white '>
      
      <div className='text-[14px]'>{/* thẻ div này là container */}
          <div className='flex flex-col gap-5 p-2.5'>{/*  thẻ này là menu  */}
           <Link to={`/profile/${currentUser.idusers}`}>
            <div className='flex items-center gap-2'>{/*  thẻ này là user  */}
              <img className="w-[38px] h-[38px] rounded-[50%] object-cover "
                 src={currentUser.profilePic ? "/upload/" + currentUser.profilePic : "/public/upload/profile.png"}
                 alt=""
                    />
              <span>{currentUser.name}</span>
            </div>
          </Link>
            <div className='flex items-center gap-2'>
              <img src={Friends} alt="" />
              <span>Friends</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Groups} alt="" />
              <span>Groups</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Market} alt="" />
              <span>Market</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Watch} alt="" />
              <span>Watch</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Memories} alt="" />
              <span>Memories</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Events} alt="" />
              <span>Events</span>
            </div>
          </div>
          <hr className='ml-5 mt-1.5 mb-1.5 text-[#d3d3d3] '  />
          <div className='flex flex-col gap-5 p-2.5'>{/*  thẻ này là menu  */}
            <div className='flex items-center gap-2'>{/*  thẻ này là user  */}
             
              <span className='text-[16px]'>Lối tắt</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Friends} alt="" />
              <span>Friends</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Groups} alt="" />
              <span>Groups</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Market} alt="" />
              <span>Market</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Watch} alt="" />
              <span>Watch</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Memories} alt="" />
              <span>Memories</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Events} alt="" />
              <span>Events</span>
            </div>
          </div>
          <hr className='ml-5 mt-1.5 mb-1.5 text-[#d3d3d3]' />
          <div className='flex flex-col gap-5 p-2.5'>{/*  thẻ này là menu  */}
            <div className='flex items-center gap-2'>{/*  thẻ này là user  */}
            
              <span className='text-[16px]'>Khác</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Friends} alt="" />
              <span>Friends</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Groups} alt="" />
              <span>Groups</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Market} alt="" />
              <span>Market</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Watch} alt="" />
              <span>Watch</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Memories} alt="" />
              <span>Memories</span>
            </div>
            <div className='flex items-center gap-2'>
              <img src={Events} alt="" />
              <span>Events</span>
            </div>
          </div>
      </div>
    </div>
  )
}

export default LeftBar