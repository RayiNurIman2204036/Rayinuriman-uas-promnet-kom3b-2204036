import React, { Component } from "react";
import ReportService from "../services/ReportService";
import "../App.css"
import Swal from 'sweetalert2'

class CreateReportComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      date: "",
      description: "",
      amount: "",
      status: "",
      receiver: "",
      jk: "",
      no_telp: "",
      address: ""
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeReceiver = this.changeReceiver.bind(this);
    this.changeJK = this.changeJK.bind(this);
    this.changeNo_Telp = this.changeNo_Telp.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.saveOrUpdateReport = this.saveOrUpdateReport.bind(this);

  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      ReportService.getReportById(this.state.id).then((res) => {
        let report = res.data;
        this.setState({
            date: report.date,
            description: report.description,
            amount: report.amount,
            status: report.status,
            receiver: report.receiver,
            jk: report.jk,
            no_telp: report.no_telp,
            address: report.address
        });
      });
    }
  }
  saveOrUpdateReport = (e) => {
    e.preventDefault();
    let report = {
        date: this.state.date,
        description: this.state.description,
        amount: this.state.amount,
        status: this.state.status,
        receiver: this.state.receiver,
        jk: this.state.jk,
        no_telp: this.state.no_telp,
        address: this.state.address,
    };
    console.log("report => " + JSON.stringify(report));

    // step 5
    if (this.state.id === "_add") {
      ReportService.createReport(report).then((res) => {
        Swal.fire({
          title: "DATA ADDED",
          text: "Data sudah ditambahkan",
          icon: "success"
        });
        this.props.history.push("/reports");
      });
    } else {
      ReportService.updateReport(report, this.state.id).then((res) => {
        Swal.fire({
          title: "DATA UPDATED",
          text: "Data sudah diperbarui",
          icon: "success"
        });
        this.props.history.push("/reports");
      });
    }
  };

  changeDate = (event) => {
    this.setState({ date: event.target.value });
  };

  changeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  changeAmount = (event) => {
    this.setState({ amount: event.target.value });
  };
  
  changeStatus = (event) => {
    console.log(event.target.value);
    this.setState({ status: event.target.value });
  };

  changeReceiver = (event) => {
    this.setState({ receiver: event.target.value });
  };

  changeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  changeJK = (event) => {
    console.log(event.target.value);
    this.setState({ jk: event.target.value });
  };

  changeNo_Telp = (event) => {
    this.setState({ no_telp: event.target.value });
  };

  changeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  cancel() {
    this.props.history.push("/reports");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Report</h3>;
    } else {
      return <h3 className="text-center">Update Report</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                <div className="form-group">
                    <label>Date: </label>
                    <input
                      type="date"
                      placeholder="tanggal"
                      name="date"
                      className="form-control"
                    value={this.state.date}
                      onChange={this.changeDate}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description: </label>
                    <input
                      placeholder="deskripsi"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount: </label>
                    <input
                      placeholder="Jumlah"
                      name="amount"
                      className="form-control"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={this.state.amount}
                      onChange={this.changeAmount}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status: </label>
                    <select
                      name="status"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.changeStatus}
                    >
                      <option disabled value="">Pembayaran</option>
                      <option value="Kredit">Kredit</option>                      
                      <option value="Debit">Debit</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Receiver: </label>
                    <input
                      placeholder="Penerima"
                      name="receiver"
                      className="form-control"
                      value={this.state.receiver}
                      onChange={this.changeReceiver}
                    />
                  </div>
                  <div className="form-group">
                    <label>Jenis Kelamin: </label>
                    <select
                      placeholder="Jenis Kelamin"
                      name="jk"
                      className="form-control"
                      value={this.state.jk}
                      onChange={this.changeJK}>
                      <option disabled value="">Jenis Kelamin</option>
                      <option value="P">Perempuan</option>
                      <option value="L">Laki-Laki</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>No. Telepon: </label>
                    <input
                      placeholder="Telepon"
                      name="no_telp"
                      className="form-control"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      value={this.state.no_telp}
                      onChange={this.changeNo_Telp}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address: </label>
                    <input
                      placeholder="Alamat"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddress}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateReport}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateReportComponent;
