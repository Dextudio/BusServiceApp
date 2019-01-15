import React, { Component } from "react";
import api from "./../api"
import Axios from "axios";

export default class AddBusModal extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            bus: "",
            time: "",
            errors: [],
            success: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.busChange = this.busChange.bind(this);
        this.timeChange = this.timeChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.bus !== "" && this.state.time !== "") {
            $("#add-bus-form button").attr("disabled", "disabled");
            Axios.post(api.addBusToBusStop, {
                    busStopId: this.props.busStopId,
                    busName: this.state.bus,
                    time: this.state.time,
                })
                .then(response => {
                    console.log(response.data);
                    switch (response.data.state) {
                        case "success":
                            this.setState({ success: [ "Bus record was added" ] });
                            this.props.handleSuccess();
                            break;
                        case "fail":
                            this.setState({ errors: response.data.errors });
                            break;
                        default:
                            this.setState({ errors: [ "Unknown type of response" ] });
                            break;
                    }
                    $("#add-bus-form button").removeAttr("disabled");
                })
                .catch(error => {
                    alert(`An Error Occured! ${error}`);
                    $("#add-bus-form button").removeAttr("disabled");
                });
        }
    }

    busChange(e) {
        this.setState({ bus: e.target.value });
    }
    
    timeChange(e) {
        this.setState({ time: e.target.value });
    }

    render() {
        const showHideClassName = this.props.show ? "modal fade show" : "modal fade";
        return (
            <div className={showHideClassName}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button onClick={this.props.handleClose} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.state.errors.length > 0 &&
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errors.join("<br/>")}
                                </div>
                            }
                            {this.state.success.length > 0 &&
                                <div className="alert alert-success" role="alert">
                                    {this.state.success.join("<br/>")}
                                </div>
                            }
                            <form onSubmit={this.handleSubmit} id="add-bus-form" method="post">
                                <div className="form-group">
                                    <label>Bus name</label>
                                    <input onChange={this.busChange} value={this.state.bus} type="text" className="form-control" required/>
                                </div>
                                <div className="form-group">
                                    <label>Time</label>
                                    <input onChange={this.timeChange} value={this.state.time} type="time" className="form-control" required/>
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}