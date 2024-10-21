import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


const Logout: React.FC<LogoutProps> = ({ setIsLoggedIn }) => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      setToken(null);
      localStorage.removeItem('token'); 
      console.log(localStorage.getItem('token'))
      setIsLoggedIn(false); 
      navigate('/login'); 
    };

    handleLogout();
  }, [setToken, setIsLoggedIn, navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <h1 className="text-2xl">Logging out...</h1>
    </div>
  );
};

export default Logout;
