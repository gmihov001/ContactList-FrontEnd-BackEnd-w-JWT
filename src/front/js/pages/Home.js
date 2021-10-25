import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<form>
				<div className="mb-3">
					<h2 className="mb-5">Log In</h2>
					<label forHtml="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
					<div id="emailHelp" className="form-text">
						We will never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label forHtml="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				<div className="mb-3 form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1" />
					<label className="form-check-label" forHtml="exampleCheck1">
						Check me out
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};
