import React, {useContext} from "react";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";

const SERVER_URL = "https://producer-e8hr.onrender.com";
// const SERVER_URL = "http://localhost:4200";

export default function SignupOrLogin({ action }) {
	const [formState, setFormState] = useState({
		username: "",
		email: "",
		password: "",
	});

	const { getUserInfo } = useContext(UserContext);

	const updateInput = (e, thingToUpdate) => {
		setFormState({ ...formState, [thingToUpdate]: e.target.value });
	};

	const submitSignupForm = () => {
		let endpoint;
		if (action === "signup") endpoint = "signup";
		if (action === "login") endpoint = "login";
console.log(endpoint)
		axios
			.post(

				SERVER_URL + "/auth" + endpoint,
				{
					username: formState.username,
					email: formState.email,
					password: formState.password,
				},
				{ withCredentials: true }
			)
			.then((response) => {
				getUserInfo();
				setFormState({
					username: "",
					email: "",
					password: "",
				})
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className={action}>
			{action === "signup" ? "Signup" : "Login"}

			<div>
                <label className="form-label">
                Username:
                </label>
				
				<input className="form-control"
					type="text"
					value={formState.username}
					onChange={(e) => {
						updateInput(e, "username");
					}}
				/>
			</div>

			<div>
                <label className="form-label">
                Email:
                </label>
				
				<input className="form-control"
					type="text"
					value={formState.email}
					onChange={(e) => {
						updateInput(e, "email");
					}}
				/>
			</div>

			<div>
                <label className="form-label">
                Password:
                </label>

				<input className="form-control" 
					type="text"
					value={formState.password}
					onChange={(e) => {
						updateInput(e, "password");
					}}
				/>
			</div>

            <br></br>

		<center><button className="beforeAfterBtn" onClick={submitSignupForm}>Submit</button></center>
        
		</div>
	);
}

