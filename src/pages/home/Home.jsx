import React from 'react';
import Stories from '../../components/stories/Stories';
import Posts from '../../components/posts/Posts';
import AddPost from '../../components/addpost/AddPost';

const Home = () => {
  
  
  return (
    <div className='bg-gray-100 sm:p-[10px]'>
      <Stories />
      <AddPost />
      <Posts />
    </div>
  )
}

export default Home