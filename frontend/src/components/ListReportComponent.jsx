import React, { Component } from 'react'
import ReportService from '../services/ReportService'
import "../App.css"
import Swal from 'sweetalert2'
import Table from 'react-bootstrap/Table';

class ListReportComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
                reports: []
        }
        this.addReport = this.addReport.bind(this);
        this.editReport = this.editReport.bind(this);
        this.deleteReport = this.deleteReport.bind(this);
    }

    deleteReport(id){

        ReportService.deleteReport(id).then( res => {
            Swal.fire({
                title: "Apakah Yakin untuk menghapus data?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Hapus",
                denyButtonText: `Jangan Hapus`
              }).then((result) => {
                if (result.isConfirmed) {
                this.setState({reports: 
                this.state.reports.
                filter(report => report.id !== id)});
                  Swal.fire("Data dihapus", "", "success");
                } else if (result.isDenied) {
                  Swal.fire("Data batal dihapus", "", "info");
                }
              });
                
            
        });
    }
    viewReport(id){
        this.props.history.push(`/view-report/${id}`);
    }
    editReport(id){
        this.props.history.push(`/add-report/${id}`);
    }

    componentDidMount(){
        ReportService.getReports().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-report/_add');
            }
            this.setState({ reports: res.data});
        });
    }

    addReport(){
        this.props.history.push('/add-report/_add');
    }
    
    render() {
        return (
            <div>
                 <h2 className="text-center">
                     Reports List</h2>
                 <div className = "row">
                    <button className="btn btn-primary"
                     onClick={this.addReport}> Add Report</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <Table responsive className 
                        = "table table-dark table-hover">

                            <thead >
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Receiver</th>
                                    <th>Jenis Kelamin</th>
                                    <th>No. Telepon</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.reports.map(
                                        report => 
                                        <tr key = {report.id}>
                                            <td>
                                                {report.date}
                                            </td>
                                            <td>
                                                {report.description}
                                            </td>
                                            <td>
                                                {report.amount}
                                            </td>
                                            <td>
                                                {report.status}
                                            </td>
                                            <td>
                                                {report.receiver}
                                            </td>
                                            <td className='mid'>
                                                {report.jk}
                                            </td>
                                            <td>
                                                {report.no_telp}
                                            </td>
                                            <td>
                                                {report.address}
                                            </td>
                                             <td>
                      <button onClick={ () => 
                          this.editReport(report.id)} 
                               className="btn btn-info">Edit 
                                 </button>                           
                                 
                       <button style={{marginLeft: "6px",}}
                          onClick={ () => this.deleteReport(report.id)} 
                             className="btn btn-danger">Delete 
                                 </button>

                       <button style={{width: "130px"}} 
                           onClick={ () => this.viewReport(report.id)}
                              className="btn btn-secondary">View 
                                  </button>
                                    </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                 </div>
            </div>
        )
    }
}

export default ListReportComponent
