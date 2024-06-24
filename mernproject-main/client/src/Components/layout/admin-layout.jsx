import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { IoMdMail, IoIosBriefcase } from 'react-icons/io';
import { useAuth } from "../../store/auth";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';


export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  

  // If loading, show loading indicator
  if (isLoading ) {

    console.log(isLoading)
    return (
 <Stack sx={{ color: 'grey.500', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} spacing={2} direction="row">
        
        <div>
          <h2>Loading:</h2>
        </div>
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
      </Stack>
     
    );

  }

  

  // If user is not an admin, redirect to home
   if (!user.isAdmin || !user )  {
    console.log("user", !user)
    console.log("isloading",isLoading)
    console.log("admin",!user.isAdmin)
  
    return <Navigate to="/" />;
  }

  // If user is admin, render the navigation
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li><NavLink to="/admin/users"><FaUser /> User</NavLink></li>
              <li><NavLink to="/admin/contacts"><IoMdMail /> Contact</NavLink></li>
              <li><NavLink to="/services"><IoIosBriefcase /> Services</NavLink></li>
              <li><NavLink to="/"><FaHome /> Home</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
