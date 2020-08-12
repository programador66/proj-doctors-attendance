import axios from "axios";

class api {
  constructor() {
    const api = axios.create({
      baseURL: `http://localhost:3333`,
    });
    this.api = api;
  }

  async getReport(params) {
    const response = await this.api.post("/report", params);
    return response;
  }

  async getAttendance() {
    const response = await this.api.get("/attendance");
    return response;
  }

  async setAttendance(params) {
    const response = await this.api.post("/attendance", params);
    return response;
  }

  async setDoctors(params) {
    const response = await this.api.post("/doctors", params);
    return response;
  }

  async getDoctors() {
    const response = await this.api.get("/doctors");
    return response;
  }

  async getClients() {
    const response = await this.api.get("/clients");
    return response;
  }
}

export default new api();
