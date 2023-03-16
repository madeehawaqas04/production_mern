import React, { useContext, useState } from 'react'
import '../css/style.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const { state, dispatch } = useContext(UserContext);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill the data",{position:"top-center"});
  }
  else{
    const res = await fetch('/signinUser', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = res.json();


   // window.alert(data);
    //window.alert(res.status);
    if (res.status === 400 || !data) {
    //  window.alert('Invalid Credentials');
      toast.error("Invalid Credentials",{position:"top-center"});

    } else {
      //window.alert('Login Successfull');
      toast.success("Login Successfull",{position:"top-center"});

      dispatch({ type: 'USER', payload: true })
      navigate('/');
    }
  }
  }

  return (
    <>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src="../images/signin-image.jpg" alt="sing up image" /></figure>
              <NavLink to="/Signup" className="signup-image-link">Create an account</NavLink>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Login </h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlfor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="email" name="email" id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                  <input type="password" name="password" id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                  <label htmlfor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signin" id="signin" className="form-submit"
                    value="Log in" onClick={loginUser} />
                </div>
              </form>
              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li><a to="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                  <li><a to="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                  <li><a to="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}

export default Login
