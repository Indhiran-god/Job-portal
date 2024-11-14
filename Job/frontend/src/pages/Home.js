import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-16">
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      {!user && (
        <Link 
          to="/login" 
          className="px-4 py-2 rounded-full text-white bg-black border border-gray-500 hover:bg-gray-800 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Home;
