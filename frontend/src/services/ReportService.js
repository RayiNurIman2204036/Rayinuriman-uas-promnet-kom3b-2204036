import axios from 'axios';

const REPORT_API_BASE_URL = "http://localhost:9080/reports";

class ReportService {

    getReports(){
        return axios.get(REPORT_API_BASE_URL);
    }

    createReport(Report){
        return axios.post(REPORT_API_BASE_URL, Report);
    }

    getReportById(reportId){
        return axios.get(REPORT_API_BASE_URL + '/' + reportId);
    }

    updateReport(report, reportId){
        return axios.put(REPORT_API_BASE_URL + '/' + reportId, report);
    }

    deleteReport(reportId){
        return axios.delete(REPORT_API_BASE_URL + '/' + reportId);
    }
}

export default new ReportService()