import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";


export const About = () => {
  const {isloggedin,user} =useAuth();  
  console.log("value" ,isloggedin);

  if (!isloggedin) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <main>
          <section className="section-hero">
            <div className="container grid grid-two-cols">
              <div className="hero-image">
                <img
                  src="/images/fire.jpg"
                  alt="coding buddies"
                  className="responsive-img" // Added this line
                />
              </div>



              <div className="hero-content">
                {user ? (
                  <p>Welcome {user.username} to our website</p>
                ) : (
                  <p>Welcome user to our website</p>
                )}

                <h1>Why Choose Us? </h1>
                <p>
                  Expertise: Our team consists of experienced IT professionals
                  who are passionate about staying up-to-date with the latest
                  industry trends.
                </p>
                <p>
                  Customization: We understand that every business is unique.
                  That's why we create solutions that are tailored to your
                  specific needs and goals.
                </p>
                <p>
                  Customer-Centric Approach: We prioritize your satisfaction
                  and provide top-notch support to address your IT concerns.
                </p>
                <p>
                  Affordability: We offer competitive pricing without
                  compromising on the quality of our services.
                </p>
                <p>
                  Reliability: Count on us to be there when you need us. We're
                  committed to ensuring your IT environment is reliable and
                  available 24/7.
                </p>
                <div className="btn btn-group">
                  <NavLink to="/contact">
                    <button className="btn secondary-btn">Connect Now</button>
                  </NavLink>
                  <NavLink to="/services">
                    <button className="btn secondary-btn">Learn More</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
};
