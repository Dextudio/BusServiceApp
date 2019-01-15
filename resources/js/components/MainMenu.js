import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axios from "axios";
import api from "./../api"

export default class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        Axios.post(api.logout)
            .then(() => {
                localStorage.removeItem("access_token");
                this.props.onLogout(null)
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    }

    authButtons(user) {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link">Hello, {user.name}</a>
                </li>
                <li className="nav-item">
                    <Link to="/logout" className="nav-link" onClick={this.logout} >Log out</Link>
                </li>
            </ul>
        );
    }

    nonAuthButtons() {
        return (
            <ul className="nav justify-content-center"></ul>
        );
    }

    render() {
        let buttons = this.props.user === null ? buttons = this.nonAuthButtons() : this.authButtons(this.props.user);
        return (
            <Router>
                {buttons}
            </Router>
        );
    }

}