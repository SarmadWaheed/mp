import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../store/auth";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]); 
  const { authorizationtoken } = useAuth();
  const getusersdata = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/user", {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });
  
      const responseData = await response.json();
      console.log("API response:", responseData);
  
       setUsers(responseData);
  
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const deleteuser=async(id)=>{
 
   try {

    const response = await fetch(`http://localhost:5000/api/admin/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorizationtoken,
      },
    });

      const data=await response.json();
      console.log(`deleted data ${data}`);
// this is done so that no need to refresh after deleting 
      if(response.ok){

        getusersdata();
      }

    } catch (error) {
      console.error(error);
    }
   

  };
  

  useEffect(() => {
    getusersdata();
  }, []);


console.log("ds",users);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((curUser) => {
      
            return(
             
            <tr key={curUser._id}>
              <td>{curUser.username}</td>
              <td>{curUser.email}</td>
              <td>{curUser.phone}</td>
              <td><Link to={`/admin/users/${curUser._id}/edit`} className="button-link"> Edit</Link></td>

              <td><button className="delete-button" onClick={()=>deleteuser(curUser._id)}>Delete</button></td>
            </tr>
           
          );
})}
        </tbody>
      </table>
    </div>
  );
};






