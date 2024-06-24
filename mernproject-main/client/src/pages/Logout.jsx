import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

export const Logout = () => {
 
  const { Logoutuser } = useAuth(); 
  console.log("data", Logoutuser);

  useEffect(() => {
    // First useEffect to call Logoutuser
    Logoutuser();
    
  }, []);

  useEffect(() => {
    // Second useEffect to display success toast
    toast.success("Successfully logged out");
    console.log("value", Logoutuser);
  }, []); // Include Logoutuser in the dependency array to ensure the effect runs when it changes

  // Redirect to the login page
  return <Navigate to="/login" />;
};
