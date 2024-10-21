import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth(); 

  const [formData, setFormData] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const storeToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: formData.username,
        password: formData.password,
      });
      
      const token = response.data.data.token;
      console.log(response.data);
      console.log(token);  
  
      storeToken(token);  
      setToken(token);     
      setIsLoggedIn(true);
      toast.success('Logged In');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full gap-4 mt-6">
      <label className="w-full">
        <p className="text-sm text-richblack-5 mb-1 leading-6">
          Username <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          className="bg-richblack-800 rounded-lg w-full p-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter your username"
          name="username"
          value={formData.username}
          onChange={changeHandler}
        />
      </label>

      <label className="w-full relative">
        <p className="text-sm text-richblack-5 mb-1 leading-6">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          className="bg-richblack-800 rounded-lg w-full p-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-9 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="#">
          <p className="text-xs mt-1 text-blue-100 hover:text-blue-200 transition-all max-w-max ml-auto">
            Forgot Password?
          </p>
        </Link>
      </label>

      <button
        className="bg-yellow-50 py-2 px-4 rounded-lg mt-6 font-medium text-richblack-900 hover:bg-yellow-100 transition-all"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;
