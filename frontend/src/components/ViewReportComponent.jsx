import React, { Component } from "react";
import ReportService from "../services/ReportService";
import "../App.css"
class ViewReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      report: {},
    };
  }

  componentDidMount() {
    ReportService.getReportById(this.state.id).then((res) => {
      this.setState({ report: res.data });
    });
  }

  render() {
    return (
      <div className="heig">
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">View Report Details</h3>
          <div className="card-body">
            <table>
              <tr>
            <div className="row">
              <td>
                <label> Date:</label></td>
              <div> {this.state.report.date}</div>
            </div>
              </tr>
            <div className="row">
              <label> Description:{'  '} </label>
              <div> {this.state.report.description}</div>
            </div>
            <div className="row">
              <label> Amount:</label>
              <div> {this.state.report.amount}</div>
            </div>
            <div className="row">
              <label> Status:</label>
              <div> {this.state.report.status}</div>
            </div>
            <div className="row">
              <label> Receiver:</label>
              <div> {this.state.report.receiver}</div>
            </div>
            <div className="row">
              <label> Jenis Kelamin:</label>
              <div> {this.state.report.jk}</div>
            </div>
            <div className="row">
              <label> No. Telepon:</label>
              <div> {this.state.report.no_telp}</div>
            </div>
            <div className="row">
              <label> Address:</label>
              <div> {this.state.report.address}</div>
            </div>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewReportComponent;
