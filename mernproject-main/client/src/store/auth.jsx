import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const[isLoading,setIsLoading]=useState(true);
  const [services, setServices] = useState([]);
  const authorizationtoken=`Bearer ${token}`;

     
    const storetokeninlocalstorage = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  

//  if token present value set to true,otherwise false

let isloggedin = !!token;

   const Logoutuser = () => {
    setToken("");
    setUser("");
   
    return localStorage.removeItem("token");
    
  };

  const userauthentication = async () => {

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userdata);
        setIsLoading(false);
      }else{
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const servicesdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/services", {
        method: "GET",
      });

      if (response.ok) {
        const services = await response.json();
        setServices(services.data);
      }
    } catch (error) {
      console.error("Error fetching services data");
    }
  };

  useEffect(() => {
    let timeout
    // Call userauthentication and servicesdata only once when the component mounts
    if (isloggedin) {
      userauthentication();
      servicesdata();
    }
    else{ timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds timeout for the else part
  }
  }, [isloggedin]);

  return (
    <AuthContext.Provider value={{ isloggedin, storetokeninlocalstorage, Logoutuser, user, services,authorizationtoken,isLoading }}>
      {children}
    </AuthContext.Provider>

    
  );
};

export const useAuth = () => {
  const authcontextvalue = useContext(AuthContext);

  if (!authcontextvalue) {
    throw new Error("You must wrap your app in the AuthProvider");
  }
  return authcontextvalue;
};
