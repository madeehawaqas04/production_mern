import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const About = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});


  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      console.log(res);
      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    }
    catch (err) {
      console.log(err);
      navigate('/');
    }
  }


  useEffect(() => {
    callAboutPage();

  }, []);


  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="../images/about1.jpg" className="pphoto" alt="profile photo" />
            </div>


            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">RANKINGS: <span> 1/10</span>  </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" >
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                  <li className="nav-item" >
                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                  </li>
                </ul>

              </div>

            </div>

            <div className="col-md-2">
              <input type="submit" className="profile-edit-btn btn btn-primary" value="Edit Profile" name='btnAddMore' />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>SKILLS</p>
                <a href="instagram" target="thapa">Software Engineer</a><br />
                <a href="instagram" target="thapa">Web Developer</a><br />
                <a href="instagram" target="thapa">github link</a><br />

              </div>
            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id='myTabContent'>



                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby='home-tab'>

                  <div className="row">
                    <div className="col-md-6">
                      <label >User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>987654321676</p>
                    </div>
                  </div>


                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>


                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>


                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>


                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label >profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>


                </div>
                <div className="tab-pane fade show " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label > Experiance</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label > Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label > Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>20</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label > English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label > Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 Months</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default About
