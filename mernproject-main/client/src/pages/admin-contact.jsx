import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts=()=>{    
    const [contacts, setContacts] = useState([]); 
    const { authorizationtoken } = useAuth();
    const getcontactsdata = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/admin/contact", {
            method: "GET",
            headers: {
              Authorization: authorizationtoken,
            },
          });

      
          const responseData = await response.json();
        
          console.log("API response:", responseData);

            setContacts(responseData);
         
      
        } catch (error) {
          
          console.error("Error fetching user data", error);
        }
      };


      const deleteuser=async(id)=>{
 
        try {
     
         const response = await fetch(`http://localhost:5000/api/admin/contact/delete/${id}`, {
           method: "DELETE",
           headers: {
             Authorization: authorizationtoken,
           },
         });
     
           const data=await response.json();
           console.log(`deleted data ${data}`);
     // this is done so that no need to refresh after deleting 
           if(response.ok){
     
             getcontactsdata();
           }
     
         } catch (error) {
           console.error(error);
         }
        
     
       };

      useEffect(() => {
        getcontactsdata();
      }, []);
    

    return (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((curUser,index) => {
          
                return(
                 
                <tr key={curUser._id}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.message}</td>
                   <td><button className="delete-button" onClick={()=>deleteuser(curUser._id)}>Delete</button></td> 
            
                </tr>
               
              );
    })}
            </tbody>
          </table>
        </div>
      );
    };

