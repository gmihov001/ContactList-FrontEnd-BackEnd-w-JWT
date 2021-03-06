import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const Home = props => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return store.token ? (
		<Redirect to="/contacts" />
	) : (
		<div className="container">
			<form>
				<div className="mb-3">
					<h2 className="my-4">Log In</h2>
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						onChange={e => setEmail(e.target.value)}
					/>
					<div id="emailHelp" className="form-text">
						We will never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className="mb-3 form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1" />
					<label className="form-check-label" htmlFor="exampleCheck1">
						Check me out
					</label>
				</div>
				<button
					type="button"
					className="btn btn-lg btn-success"
					onClick={() => {
						if (actions.login(email, password)) {
							props.history.push("/contacts");
						}
					}}>
					Submit
				</button>
			</form>
		</div>
	);
};

Home.propTypes = {
	history: PropTypes.object
};
