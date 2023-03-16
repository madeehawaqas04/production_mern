import React, { useState } from 'react'
import '../css/style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Signup = () => {

  const [user, setUser] = useState({
    name: '', email: '', phone: '', work: '', password: '', cpassword: ''
  })
  const navigate = useNavigate();
  let name, value;
  const handleInputs = (e) => {
    console.log(e);

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    if (!name || !email || !phone || !work || !password || !cpassword) {
      toast.error("Please fill all fields",{position:"top-center"});
  }
else{
    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword
      })
    });

    const data = await res.json();

    console.log(data);
    if (res.status === 422 || !data) {

      //window.alert("Invalid Registration");

      console.log("Invalid Registration");
      toast.error("Invalid Registration",{position:"top-center"});


    } else {
      window.alert("Registration Successful");

      console.log("Registration Successful");

      toast.success("Registration Successful",{position:"top-center"});

      navigate('/Login');

    }
  }
  }

  const PostDataAxios = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    axios.post('/register', user)
      .then((resp) => {
        console.log("resp", resp);
        window.alert("Registration Successful");
        window.alert(resp);
      }).catch((error) => {
        console.log(error);
        window.alert(error);
      });
  }


  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name="name" id="name"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label for="email"><i className="zmdi zmdi-email"></i></label>
                  <input type="email" name="email" id="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email" />
                </div>



                <div className="form-group">
                  <label for="phone"><i className="zmdi zmdi-phone"></i></label>
                  <input type="number" name="phone" id="phone"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone" />
                </div>

                <div className="form-group">
                  <label for="work"><i className="zmdi zmdi-slideshow"></i></label>
                  <input type="work" name="work" id="work"
                    value={user.work}
                    onChange={handleInputs}
                    placeholder="Your Profession" />
                </div>

                <div className="form-group">
                  <label for="password"><i className="zmdi zmdi-lock-outline"></i></label>
                  <input type="password" name="password" id="password"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Password" />
                </div>
                <div className="form-group">
                  <label for="cpassword"><i className="zmdi zmdi-lock-outline"></i></label>
                  <input type="password" name="cpassword" id="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Your password" />
                </div>
                <div className="form-group">
                  <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                  <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="form-submit"
                    value="Register"
                    onClick={PostData} />
                </div>

                {/* <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="form-submit"
                    value="Register"
                    onClick={PostDataAxios} />
                </div> */}

              </form>
            </div>
            <div className="signup-image">
              <figure><img src="../images/signup-image.jpg" alt="sing up image" /></figure>
              <NavLink to="/Login" className="signup-image-link">I am already member</NavLink>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Signup
