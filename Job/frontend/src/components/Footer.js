import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaFileAlt, FaUser, FaBuilding, FaHome,} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 text-white">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        
        {/* Main navigation */}
        <nav className="flex space-x-8 text-white">
          <Link to="/" className="flex flex-col items-center hover:text-gray-400">
            <FaHome size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/jobs" className="flex flex-col items-center hover:text-gray-400">
            <FaBriefcase size={20} />
            <span className="text-xs mt-1">Jobs</span>
          </Link>
          <Link to="/resume" className="flex flex-col items-center hover:text-gray-400">
            <FaFileAlt size={20} />
            <span className="text-xs mt-1">Resume</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center hover:text-gray-400">
            <FaUser size={20} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link to="/companies" className="flex flex-col items-center hover:text-gray-400">
            <FaBuilding size={20} />
            <span className="text-xs mt-1">Companies</span>
          </Link>
        </nav>

        {/* Additional Links */}
        <div className="text-center space-y-2">
          <Link to="/about" className="hover:text-gray-400">About us</Link> | 
          <Link to="/careers" className="hover:text-gray-400">Careers</Link> | 
          <Link to="/privacy-policy" className="hover:text-gray-400">Privacy policy</Link> | 
          <Link to="/terms" className="hover:text-gray-400">Terms & conditions</Link> | 
          <Link to="/trust-safety" className="hover:text-gray-400">Trust & safety</Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
