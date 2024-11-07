import React, { useState } from 'react';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import { MdOutlineEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { IoIosKey } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/Firebase';
import {doc, setDoc} from 'firebase/firestore';

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPass) {
      alert("Password is mismatch!");
      return;
    }

    try {
      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Firebase Auth user object

      //set the display name
      await updateProfile(user, {
        displayName: fullName
      });

      // Store user data in Firestore with the user's UID as the document ID
      await setDoc(doc(db, "Users", user.uid), {
        name: fullName,
        role: role,
        email: email,
        password: password,
        location: location
      });
        
      navigate('/login'); // Redirect after successful signup
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Failed to create an account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pb-4 flex items-center justify-center bg-white">
      <div className="container max-w-xl bg-white space-y-6 p-8 rounded-lg shadow-3xl">
        <div className="text-center mb-8">
          <JoinInnerIcon className="text-green-600 text-5xl mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Join Us</h1>
          <p className="text-sm text-gray-600">Create an account to get started</p>
        </div>

        <form onSubmit={handleSubmit} >
          <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:gap-2 xs:gap-2 xs:grid-cols-1 sm:grid-cols-2 lg:gap-x-6 md:gap-x-6'>
            {/* Fullname Input */}
            <div className="flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
              <MdDriveFileRenameOutline className="text-gray-500 m-3" size={20} />
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              />
            </div>

            {/* Role Input */}
            <div className="flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
              <CgProfile className="text-gray-500 m-3" size={20} />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              >
                <option value="" disabled className="text-gray-500">Select your role</option>
                <option value="admin">Admin</option>
                <option value="rescuer">Rescuer</option>
                <option value="general">General User</option>
              </select>
            </div>

            {/* Location Input */}
            <div className="flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
              <CiLocationOn className="text-gray-800 m-3" size={20} />
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              />
            </div>

            {/* Email Input */}
            <div className="flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
              <MdOutlineEmail className="text-gray-500 m-3" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
              <IoIosKey className="text-gray-500 m-3" size={20} />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
              <GiConfirmed className="text-gray-500 m-3" size={20} />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              />
            </div>

          </div>
          {/* Signup Button */}
          <div className="mb-4  text-center">
            <button
              type="submit"
              className="w-1/2 py-2 px-4 bg-green-600 text-white font-normal rounded-3xl hover:bg-green-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <p className="text-gray-700 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
