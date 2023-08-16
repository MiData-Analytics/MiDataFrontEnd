export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://midata-backend.onrender.com"
    : "http://localhost:1337";

export const urls = {
  socket: `${baseUrl}`,
  login: `${baseUrl}/api/v1/user/login`,
  signup: `${baseUrl}/api/v1/user/signup`,
  getUser: `${baseUrl}/api/v1/user/profile`,
};
