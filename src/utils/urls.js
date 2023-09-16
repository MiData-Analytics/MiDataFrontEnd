export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://midata-backend.onrender.com"
    : "http://localhost:1337";

export const urls = {
  socket: `${baseUrl}`,
  login: `${baseUrl}/api/v1/user/login`,
  monitorLogin: `${baseUrl}/api/v1/monitor/login`,
  signup: `${baseUrl}/api/v1/user/signup`,
  getUser: `${baseUrl}/api/v1/user/profile`,
  verifyEmail: `${baseUrl}/api/v1/user/verify/email/`,
  updateProfile: `${baseUrl}/api/v1/user/profile/update`,
  createMonitor: `${baseUrl}/api/v1/admin/create/user`,
  getMonitorList: `${baseUrl}/api/v1/admin/monitors`,
  getMonitorById: `${baseUrl}/api/v1/admin/monitor/`,
  getMonitorProfile: `${baseUrl}/api/v1/monitor/profile`,
  deleteMonitor: `${baseUrl}/api/v1/admin/delete/`,
  updateMonitor: `${baseUrl}/api/v1/admin/monitor/update/`,
  initializeChecklist: `${baseUrl}/api/v1/admin/checklist/initialize`,
  getChecklistById: `${baseUrl}/api/v1/admin/checklist/`,
  getChecklists: `${baseUrl}/api/v1/admin/checklists`,
  getAllQuestions: `${baseUrl}/api/v1/admin/checklist/questions/`,
  newSection: `${baseUrl}/api/v1/admin/checklist/section`,
  updateSection: `${baseUrl}/api/v1/admin/checklist/section/`,
  deleteSection: `${baseUrl}/api/v1/admin/checklist/section/`,
  updateChecklistHeader: `${baseUrl}/api/v1/admin/checklist/header/`,
  uploadChecklistHeaderIMG: `${baseUrl}/api/v1/admin/checklist/header/upload/`,
  newQuestion: `${baseUrl}/api/v1/admin/question/new`,
  deleteQuestion: `${baseUrl}/api/v1/admin/question/delete/`,
  updateQuestion: `${baseUrl}/api/v1/admin/question/edit/`,
  copyQuestion: `${baseUrl}/api/v1/admin/question/copy`,
  monitorGetQuestion: `${baseUrl}/api/v1/monitor/checklist/`,
};
