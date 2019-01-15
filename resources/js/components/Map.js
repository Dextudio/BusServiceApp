import React, { Component } from "react";
import {Map as LeafletMap, TileLayer, Marker, Popup} from "react-leaflet"
import Axios from "axios";
import api from "./../api"
import BusSchedule from "./BusSchedule"
import AddBusModal from "./AddBusModal"

export default class Map extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            zoom: 15,
            stops: [],
            showModal: false,
            modalSuccessFunction: null,
            modalBusStopId: null,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount() {
        Axios.post(api.busStops)
            .then(response => {
                this.setState({stops: response.data});
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    }

    showModal(modalSuccessFunction, busStopId) {
        this.setState({
            showModal: true,
            modalSuccessFunction: modalSuccessFunction,
            modalBusStopId: busStopId,
        });
    }

    hideModal() {
        this.setState({
            showModal: false,
            modalSuccessFunction: null,
        });
    }

    render() {
        if (this.props.user === null) {
            return "";
        }
        const position = [this.props.user.latitude, this.props.user.longitude];
        const markers = this.state.stops.map((busStop) => {
            const position = [busStop.latitude, busStop.longitude];
            return(
				<Marker key={busStop.id} position={position}>
					<Popup>
						<BusSchedule busStop={busStop} addBusHandle={this.showModal} />
					</Popup>
				</Marker>
			);
        });
        return (
			<LeafletMap center={position} zoom={this.state.zoom} className="main-map">
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
				/>
				{markers}
				<AddBusModal show={this.state.showModal} handleClose={this.hideModal} handleSuccess={this.state.modalSuccessFunction} busStopId={this.state.modalBusStopId} title={"Add bus"} />
			</LeafletMap>
		);
    }

}
