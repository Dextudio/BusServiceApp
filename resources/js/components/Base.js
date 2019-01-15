import React, { Component } from 'react';
import Login from "./Login";
import MainMenu from "./MainMenu";
import Map from "./Map";
import Axios from "axios";
import api from "./../api"

export default class Base extends Component {

    constructor(prop) {
        super(prop);
        this.state = {user: null};
        this.setUser = this.setUser.bind(this)
    }

    setUser(user) {
        this.setState({user: user});
    }

    componentDidMount() {
        Axios.post(api.user)
			.then(response => {
				this.setUser(response.data)
			})
			.catch(error => {
				alert(`An Error Occured! ${error}`);
				localStorage.removeItem("access_token");
			});
    }

    render() {
        let mainContent;

        if (localStorage.getItem("access_token") === null) {
            mainContent = <Login onLogin={this.setUser} />
        } else {
            mainContent = <Map user={this.state.user} />
        }

        return (
			<div>
				<div id="menu">
					<MainMenu user={this.state.user} onLogout={this.setUser} />
				</div>
				<div id="main">
					{mainContent}
				</div>
			</div>
		);
    }

}
