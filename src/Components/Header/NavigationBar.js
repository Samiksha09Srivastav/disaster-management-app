import React, { useState, useEffect , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import {auth} from '../../firebase/Firebase'
import { updateProfile, signOut, onAuthStateChanged } from 'firebase/auth';
import {AuthContext} from '../../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userRole } = useContext(AuthContext);
  console.log(userRole);
  
  //Function to update display name
  const updateDisplayName = async (newName) => {
    if ( auth.currentUser ) {
      try {
        await updateProfile(auth.currentUser, { displayName: newName });
        console.log('Display name updated successfully!');
        setUserName(newName);
      } catch(error) {
        console.error('Error updating display name', error);
      }
    }
  }

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user); // Check if user.displayName is showing correctly
        setIsLoggedIn(true);
        setUserName(user.displayName || 'User'); // Use user's displayName or fallback to 'User'
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Navigation Bar */}
        <nav className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          {/* Conditional rendering based on user role */}
          {userRole === 'admin' && (
            <>
              
              
              <Link to="/user-management" className="hover:text-gray-200">User Management</Link>
            </>
          )}
          
          <Link to="/alerts" className="hover:text-gray-200">Alerts</Link>
          {(userRole === 'admin' || userRole === 'rescuer') && (
            <Link to="/resources" className="hover:text-gray-200">Resources</Link>
          )}
          
          <Link to="/help-requests" className="hover:text-gray-200">Help Requests</Link>
        </nav>

        {/* User Profile Menu */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {userName}
            <IoIosArrowDown className="ml-2 text-white" />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
              {userRole === 'admin' && (
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
              )}
              
              <span onClick={handleLogout}  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</span >
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
