import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  

  const params = useParams();
  const { authorizationtoken } = useAuth();

  const getsingleuserdata = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/user/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationtoken,
        },
      });

      const userData = await response.json();
      console.log(`get single user data ${userData}`);

      setData(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getsingleuserdata();
  }, []);

  // handling the input values
  const handleinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/admin/user/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationtoken,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("updated successfully");
      } else {
        toast.error("not updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-contact">
            <div className="container grid grid-two-cols">
              <div className="contact-form">
                <h1 className="main-heading mb-3">Update User Data</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      placeholder="username"
                      required
                      autoComplete="off"
                      value={data.username}
                      onChange={handleinput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email"
                      required
                      autoComplete="off"
                      value={data.email}
                      onChange={handleinput}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="phone"
                      name="phone"
                      id="phone"
                      placeholder=" enter your phone number"
                      required
                      autoComplete="off"
                      value={data.phone}
                      onChange={handleinput}
                    />
                  </div>

                  <br />

                  <button type="submit" className="btn-btn-submit">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
