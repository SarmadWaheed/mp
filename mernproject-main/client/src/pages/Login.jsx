import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

export const Login = () => {
  const {isloggedin} = useAuth();
  console.log('val',isloggedin);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {storetokeninlocalstorage} = useAuth();
    
  // handling the input values
  const handleinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling the submission to get data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("login", response);

      const res_data = await response.json();
      console.log("response from server", res_data);

      if (response.ok) {   
        console.log("Token from server:", res_data.token);
    
        storetokeninlocalstorage(res_data.token);
        setUser({ email: "", password: "" });
        toast.success("Successfully logged in");
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
     
    } catch (error) {
      console.log("login", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="reg-image">
                <img
                  src="/images/fire.jpg"
                  alt="fire"
                  className="responsive-img" // Added this line
                />
              </div>
              <div className="reg-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleinput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleinput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn-btn-submit">Login now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
