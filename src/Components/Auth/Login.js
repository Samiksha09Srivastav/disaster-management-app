import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { MdOutlineEmail } from "react-icons/md";
import { IoIosKey } from "react-icons/io";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/Firebase'; // Adjust path to your Firebase config

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect after successful login
    } catch (error) {
      setError('Failed to login. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-4 flex items-center justify-center bg-white">
      <div className="container max-w-xl bg-white space-y-6 p-8 rounded-lg shadow-3xl">
        {/* Heading Section */}
        <div className="text-center mb-8">
          <LockIcon className="text-green-600 text-5xl mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-600">Please sign in to continue</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
            <MdOutlineEmail className="text-gray-500 m-3" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center border rounded-3xl border-gray-300 px-2 shadow-inner shadow-lg mb-6">
            <IoIosKey className="text-gray-500 m-3" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 outline-none text-sm rounded-3xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 "
            >
              {showPassword ? <BiHide className="text-gray-500 m-3" size={20}/> :  <BiShow className="text-gray-500 m-3" size={20}/>}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Login Button */}
          <div className="mb-4 rounded-3xl shadow-lg">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-normal rounded-3xl hover:bg-green-700 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <p className="text-gray-700 text-center text-sm mb-4">
          <Link to="/forgot-password" className="text-blue-500 hover:underline cursor-pointer">
            Forgot your password?
          </Link>
        </p>

        {/* Footer Section */}
        <p className="text-gray-700 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
