import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Logout from '../pages/Logout';
import PrivateRoute from './PrivateRoute';




import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Dispatch, SetStateAction } from 'react';



const routesConfig = [
  {
    path: "/",
    element: "Home",
    isProtected: false,
  },
  {
    path: "/login",
    element: "Login",
    redirectTo: "/dashboard", 
    isProtected: false,
  },
  {
    path: "/signup", 
    element: "Signup",
    redirectTo: "/dashboard", 
    isProtected: false,
  },
  {
    path: "/dashboard", 
    element: "Dashboard",
    isProtected: true,
  },
  {
    path: "/logout", 
    element: "Logout",
    isProtected: true, 
  },
  {
    path: "/update-student/:id",  // New route for updating student
    element: "UpdateStudent",
    isProtected: true,
  },
  {
    path: "/update-course/:id",  // New route for updating course
    element: "UpdateCourse",
    isProtected: true,
  },
  {
    path: "/update-student/:id",  
    element: "UpdateStudent",
    isProtected: true,
  },
  {
    path: "/update-course/:id",  
    element: "UpdateStudent", // Reusing UpdateStudent component
    isProtected: true,
  },
  {
    path: "/delete-student/:id",  
    element: "DeleteConfirmation",
    isProtected: true,
  },
  {
    path: "/delete-course/:id",  
    element: "DeleteConfirmation", // Reusing DeleteConfirmation component
    isProtected: true,
  }
];

interface AllRoutesProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AllRoutes: React.FC<AllRoutesProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const renderRouteElement = (route: any) => {
    if (route.isProtected) {
      return (
        <PrivateRoute>
          {route.element === 'Dashboard' && <Dashboard />}
          {route.element === 'Logout' && <Logout setIsLoggedIn={setIsLoggedIn} />}


        </PrivateRoute>
      );
    } else if (isLoggedIn && route.redirectTo) {
      return <Navigate to={route.redirectTo} />;
    } else {
      if (route.element === 'Home') return <Home />;
      if (route.element === 'Login') return <Login setIsLoggedIn={setIsLoggedIn} />;
      if (route.element === 'Signup') return <Signup setIsLoggedIn={setIsLoggedIn} />;
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {routesConfig.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={renderRouteElement(route)}
          />
        ))}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default AllRoutes;
