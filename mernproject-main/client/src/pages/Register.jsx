import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

export const Register=() =>{

    const [user,setUser] =useState({
        username:"",
        email:"",
        phone:"",
        password:"",

    });
   const navigate=useNavigate();
   // for storing token in local storage
   const {storetokeninlocalstorage}=useAuth();
   console.log("va",storetokeninlocalstorage)
    // handling the input values
    const handleinput=(e)=>{
        
        let name=e.target.name;
        let value=e.target.value;
        

 setUser({
    ...user,
    [name]:value,
 });

    };

    // handling the submission to get data

    const handleSubmit=async(e) =>{

    e.preventDefault();

    console.log(user);

    try {
    const response=await fetch('http://localhost:5000/api/auth/register',{ 
        method:'POST',
        headers:{
        "Content-Type":"application/json",
        },
        body:JSON.stringify(user),    
    });
    console.log("register",response);

    const res_data=await response.json();
    console.log("response from server", res_data);
    if (response.ok){

        // store token in local storage
        storetokeninlocalstorage(res_data.token);

        setUser({ username:"", email:"", phone:"", password:"", });
        toast.success("succesfully register");
        navigate("/");
     } else{
        toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message);
        
    }
    
     } catch (error) {
    
       console.log("register",error);
}
    };

    return (<>

<section>

        <main>
          <div className="section-registration">
                <div className="container grid grid-two-cols">

                <div className="reg-image">
                    <img src="/images/fire.jpg" alt="fire" 
                    className="responsive-img" // Added this line
                    />
                    </div>
                    <div className="reg-form">
                        <h1 className="main-heading mb-3">Registration form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" 
                                name="username" 
                                id="username"  
                                placeholder="username" 
                                required 
                                autoComplete="off"
                                value={user.username}
                                onChange={handleinput}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" 
                                name="email" 
                                id="email"  
                                placeholder="email" 
                                required 
                                autoComplete="off"
                                value={user.email}
                                onChange={handleinput}/>
                            </div>

                            <div>
                                <label htmlFor="phone">phone</label>
                                <input type="phone" 
                                name="phone" 
                                id="phone"  
                                placeholder=" enter your phone number" 
                                required 
                                autoComplete="off"
                                value={user.phone}
                                onChange={handleinput}/>
                            </div>

                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" 
                                name="password" 
                                id="password"  
                                placeholder="password" 
                                required 
                                autoComplete="off"
                                value={user.password}
                                onChange={handleinput}/>
                            </div>

                            <br />

                            <button type="submit" className="btn-btn-submit">Register now</button>


                        </form>
                    </div>
                </div>
                </div>

          

        </main>
    
    </section>


    
    
    
    
    
    
    
    
    
    </>





    );
    
    };