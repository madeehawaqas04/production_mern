import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toastermessage from './Toastermessage';
  

import '../css/stylecontactus.css'

const Contact = () => {

	const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' });


	const userContact = async () => {
		try {
			const res = await fetch('/getdata', {
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

			setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

			if (!res.status === 200) {
				const error = new Error(res.error);
				toast.error(error,{position:"top-center"});

				throw error;
			}


		}
		catch (err) {
			console.log(err);
			toast.error(err,{position:"top-center"});

		}
	}


	useEffect(() => {
		userContact();

	}, []);

	//storing data in state

	const handleInputs = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setUserData({ ...userData, [name]: value });

	}

	//send the data to backend
	const contactFormSubmit = async (e) => {
		e.preventDefault();

		const { name, email, phone, message } = userData;

		if (!name || !email || !phone || !message) {
            console.log("error in contact form");
          //  window.alert("Please fill the contact form");
		  toast.error("Please fill the contact form",{position:"top-center"});

		 
        }
		else{
		const res =await fetch('/contact', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name, email, phone, message
			})
		});

		
		const data = await res.json();
		//console.log(data);
		//window.alert(data);
		if (!data) {
			console.log('message not sent');
			toast.error("Message not Sent",{position:"top-center"});
		}
		else {
			console.log('Message Send');
			//window.alert('Message Send');
			toast.success("Message Send",{position:"top-center"});
			setUserData({ ...userData, message: "" });
		}

	}
	}


	return (
		<>
			<section className="ftco-section">
				<div className="container">
					{/* <div className="row justify-content-center">
						<div className="col-md-6 text-center ">
							<h2 className="heading-section">Contact Us</h2>
						</div>
					</div> */}
					<div className="row justify-content-center">
						<div className="col-md-12">
							<div className="wrapper">
								<div className="row">
									<div className="col-md-4">
										<div className="dbox w-100 text-center">
											<div className="icon d-flex align-items-center justify-content-center">
												<span className="fa fa-map-marker"></span>
											</div>
											<div className="text">
												<p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="dbox w-100 text-center">
											<div className="icon d-flex align-items-center justify-content-center">
												<span className="fa fa-phone"></span>
											</div>
											<div className="text">
												<p><span>Phone:</span> <a href="tel://1234567920">{userData.phone}</a></p>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="dbox w-100 text-center">
											<div className="icon d-flex align-items-center justify-content-center">
												<span className="fa fa-paper-plane"></span>
											</div>
											<div className="text">
												<p><span>Email:</span> <a href="mailto:info@yoursite.com">{userData.email}</a></p>
											</div>
										</div>
									</div>
									{/* <div className="col-md-3">
										<div className="dbox w-100 text-center">
											<div className="icon d-flex align-items-center justify-content-center">
												<span className="fa fa-globe"></span>
											</div>
											<div className="text">
												<p><span>Website</span> <a href="#">yoursite.com</a></p>
											</div>
										</div>
									</div> */}
								</div>
								<div className="row no-gutters">
									<div className='container'>
										<div className='row'>
											<div className="col-lg-9 offset-lg-2">
												<div className="contact-wrap w-100  py-5">
													<h3 className="mb-4">Get in Touch</h3>
													<div id="form-message-warning" className="mb-4"></div>
													<div id="form-message-success" className="mb-4">
														Your message was sent, thank you!
													</div>
													<form method="POST" id="contactForm" name="contactForm" className="contactForm">


														<div className="row mb-2">
															<div className="col-md-4">
																<div className="form-group">
																	{/* <label className="label" for="name">Full Name</label> */}
																	<input type="text" className="form-control"
																		name="name" id="name"
																		value={userData.name}
																		onChange={handleInputs}
																		placeholder="Name" />
																</div>
															</div>
															<div className="col-md-4">
																<div className="form-group">
																	{/* <label className="label" for="email">Email Address</label> */}
																	<input type="email" className="form-control"
																		name="email" id="email"
																		value={userData.email}
																		onChange={handleInputs}
																		placeholder="Email" />
																</div>
															</div>

															<div className="col-md-4">
																<div className="form-group">
																	{/* <label className="label" for="subject">Phone</label> */}
																	<input type="text" className="form-control"
																		name="Phone" id="Phone"
																		value={userData.phone}
																		onChange={handleInputs}
																		placeholder="Phone" />
																</div>
															</div>
														</div>
														<div className="row mb-2">
															<div className="col-md-9">
																<div className="form-group">
																	{/* <label className="label" for="#">Message</label> */}
																	<textarea name="message"
																		className="form-control"
																		id="message" cols="30" rows="4"
																		value={userData.message}
																		onChange={handleInputs}
																		placeholder="Message"
																	></textarea>
																</div>
															</div>
														</div>
														<div className='row '>
															<div className="col-md-3">
																<div className="form-group">
																	<input type="submit" value="Send Message"
																		className="btn btn-primary"
																		onClick={contactFormSubmit} />
																	<div className="submitting"></div>
																</div>
															</div>

														</div>

													</form>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
				{/* </div> */}
			</section>

			<ToastContainer />

		</>
	)
}

export default Contact
