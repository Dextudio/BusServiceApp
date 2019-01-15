import React, { Component } from "react";
import Axios from "axios";
import api from "./../api"

export default class BusSchedule extends Component {

    constructor(prop) {
        super(prop);
        this.state = {
            stop: null,
            schedule: {},
            nearestBuses: {},
        };
        this.updateSchedule = this.updateSchedule.bind(this);
    }

    componentDidMount() {
        Axios.post(api.busStopSchedule + this.props.busStop.id)
            .then(response => {
                let nearestBuses = {};
                for (let busName in response.data) {
                    let timeBeforeArrival = this.getNearestArivalTime(response.data[busName]);
                    if (timeBeforeArrival > 0) {
                        nearestBuses[busName] = timeBeforeArrival;
                    }
                }
                this.setState({
                    nearestBuses: nearestBuses,
                    schedule: response.data,
                    stop: this.props.busStop,
                });
                this.timerID = setInterval(
                        () => this.tick(),
                        60000
                        );
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    }

    componentWillUnmount() {
        console.log("Bus schedule unmount");
        clearInterval(this.timerID);
    }

    getNearestArivalTime(times) {
        const now = new Date();
        const minutesFromDayStart = now.getHours() * 60 + now.getMinutes();
        let waitTime = 0;
        let minTime = 0;
        for (let timeOfArrival of times) {
            waitTime = timeOfArrival - minutesFromDayStart;
            if (waitTime == 0) {
                continue;
            } else if (waitTime < 0) {
                waitTime += 24 * 60;
            }
            if (minTime == 0 || minTime > waitTime) {
                minTime = waitTime;
            }
        }
        return minTime;
    }

    tick() {
        console.log("tick");
        let nearestBuses = this.state.nearestBuses;
        for (let busName in this.state.schedule) {
            if (nearestBuses.hasOwnProperty(busName)) {
                nearestBuses[busName]--;
                if (nearestBuses[busName] > 0) {
                    continue;
                }
                delete nearestBuses[busName];
            }
            let timeBeforeArrival = this.getNearestArivalTime(this.state.schedule[busName]);
            if (timeBeforeArrival > 0) {
                nearestBuses[busName] = timeBeforeArrival;
            }
        }
        this.setState({
            nearestBuses: nearestBuses,
        });
    }

    updateSchedule() {
        Axios.post(api.busStopSchedule + this.state.stop.id)
            .then(response => {
                this.setState({
                    schedule: response.data,
                });
            })
            .catch(error => {
                alert(`An Error Occured! ${error}`);
            });
    }

    render() {
        if (this.state.stop === null) {
            return "";
        }
        const buses = Object.keys(this.state.nearestBuses);
        const records = buses.map((busName) => {
            const minutes = this.state.nearestBuses[busName] % 60;
            const hours = (this.state.nearestBuses[busName] - minutes) / 60;
            const time = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
            return <tr key={ busName }>
                <td>{ busName }</td>
                <td>{ time }</td>
            </tr>
        });
        return (
            <div>
                <p className="font-weight-bold">{ this.state.stop.name }</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        { records }
                    </tbody>
                </table>
                <button onClick={() => {
                    this.props.addBusHandle(this.updateSchedule, this.state.stop.id)
                }} className="btn btn-primary">Add bus</button>
            </div>
        );
    }

}