
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from "react";
import ReactDOM from "react-dom";
import Base from "./components/Base";
import Axios from "axios";

Axios.defaults.headers.common["X-CSRF-TOKEN"] = $('meta[name="csrf-token"]').attr("content");
if (localStorage.getItem("access_token") !== null) {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage["access_token"];
}

ReactDOM.render(<Base />, document.getElementById("root"));
