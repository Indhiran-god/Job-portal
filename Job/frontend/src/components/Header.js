import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // To determine the current path
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUserDetails(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate('/login');
      } else {
        toast.error(data.message || 'Logout failed');
      }
    } catch (error) {
      toast.error('Error logging out. Please try again.');
      console.error('Logout error:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Check if the current page is the home page
  const isHomePage = location.pathname === '/';

  return (
    <header className="h-16 shadow-md bg-white relative">
      <div className="h-full container mx-auto flex items-center px-4">
        {/* Black box leading to home */}
        <Link to="/" className="flex items-center mr-4">
          <div className="w-8 h-8 bg-black rounded-lg cursor-pointer"></div>
        </Link>

        {/* Conditionally render the search bar and logout button only on the home page */}
        {isHomePage && (
          <>
            {/* Centered search bar */}
            <input 
              type="text" 
              value={searchQuery} 
              onChange={handleSearchChange} 
              placeholder="Search..." 
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-600 mx-4"
            />

            {/* Logout button */}
            {user?._id && (
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 rounded-full text-white bg-black border border-gray-500 hover:bg-gray-800 hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
              >
                Logout
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
