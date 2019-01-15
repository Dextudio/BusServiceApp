import React, { Component } from "react";
import Axios from "axios";
import api from "./../api"

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {email: "", pass: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passChange = this.passChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.email !== "" && this.state.pass !== "") {
            $("#login-form button").attr("disabled", "disabled");

            Axios.post(api.login, {
					email: this.state.email,
					password: this.state.pass,
				})
				.then(response => {
					localStorage["access_token"] = response.data.access_token;
					Axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage["access_token"];
					Axios.post(api.user)
						.then(response => {
							this.props.onLogin(response.data)
						})
						.catch(error => {
							alert(`An Error Occured! ${error}`);
							$("#login-form button").removeAttr("disabled");
						});
				})
				.catch(error => {
					alert(`An Error Occured! ${error}`);
					$("#login-form button").removeAttr("disabled");
				});
        }
    }

    emailChange(e) {
        this.setState({email: e.target.value});
    }

    passChange(e) {
        this.setState({pass: e.target.value});
    }

    render() {
        return (
			<div>
				<form onSubmit={this.handleSubmit} id="login-form" method="post">
					<div className="form-group">
						<label>Email</label>
						<input onChange={this.emailChange} value={this.state.email} type="email" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input onChange={this.passChange} value={this.state.pass} type="password" className="form-control"/>
					</div>
					<button type="submit" className="btn btn-primary">Login</button>
				</form>
			</div>
		);
    }

}