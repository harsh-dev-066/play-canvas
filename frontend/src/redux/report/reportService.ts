import axios from "axios";
import { getCookie } from "../../utils/cookieHelper";

const token = getCookie("token");

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/report/`;

const getReports = async (payload) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "get-all", payload, config);
  return response.data;
};

const createReport = async (reportData: object) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "create", reportData, config);
  return response.data;
};

const getReportById = async (reportId: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `get-report/${reportId}`, config);
  return response.data;
};

const deleteReport = async (reportId: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `delete/${reportId}`, config);
  return response.data;
};

const reportService = {
  getReports,
  createReport,
  getReportById,
  deleteReport,
};

export default reportService;
