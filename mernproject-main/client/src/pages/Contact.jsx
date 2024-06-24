import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const Contact=() =>{

    const [contact,setContact] =useState({
        username:"",
        email:"",
        message:"",

    });

    const [userdata,setUserdata]=useState(true);

    const {user} =useAuth();

    if(userdata && user){

        setContact({
            username: user.username,
            email: user.email,
            message:"",
        });

        setUserdata(false);
    }

    // handling the input values
    const handleinput=(e)=>{
        
        let name=e.target.name;
        let value=e.target.value;
        

 setContact({
    ...contact,
    [name]:value,
 });

    };

    // handling the submission to get data

    const handleSubmit=async(e) =>{

    e.preventDefault();

    console.log(contact);
    try {
        const response=await fetch('http://localhost:5000/api/auth/contact',{ 
            method:'POST',
            headers:{
            "Content-Type":"application/json",
            },
            body:JSON.stringify(contact),    
        });
        const res_data=await response.json();
        if (response.ok){
            setContact({ username:"", email:"", message:"", });
           toast.success("Message sent successfully");
        } else {
            toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message);
    
          }  
    console.log(response);
         } catch (error) {
           console.log("message",error);
    }
    }

    return (<>
     <section >

<main>
  <div className="section-contact">
        <div className="container grid grid-two-cols">

        <div className="contact-image">
            <img src="/images/fire.jpg" alt="fire" 
            className="responsive-img" // Added this line
            />
            </div>
            <div className="contact-form">
                <h1 className="main-heading mb-3">Contact form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">username</label>
                                <input type="username" 
                                name="username" 
                                id="username"  
                                placeholder="username" 
                                required 
                                autoComplete="off"
                                value={contact.username}
                                onChange={handleinput}/>
                            </div>
                <div>
                    <label htmlFor="email">email</label>
                                <input type="email" 
                                name="email" 
                                id="email"  
                                placeholder="email" 
                                required 
                                autoComplete="off"
                                value={contact.email}
                                onChange={handleinput}/>
                            </div>
                            <div>
                                <label htmlFor="message">message</label>
                               <textarea name="message" id="message" cols="30" rows="10"
                                placeholder="message" 
                                required 
                                autoComplete="off"
                                value={contact.message}
                                onChange={handleinput}
                               ></textarea>
                            </div>

                            <br />

                            <button type="submit" className="btn-btn-submit">Submit</button>


                        </form>
                    </div>
                </div>
                </div>

          

        </main>
    </section>

    


    
    </>);
    
    };