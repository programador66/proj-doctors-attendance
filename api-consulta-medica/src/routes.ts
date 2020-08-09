import express from "express";

import DoctorsController from "./controllers/DoctorsController";
import ClientsController from "./controllers/ClientsController";
import AttendanceController from "./controllers/AttendanceController";

const routes = express.Router();
const doctorsController = new DoctorsController();
const clientsController = new ClientsController();
const attendance = new AttendanceController();

routes.get("/doctors", doctorsController.index);
routes.post("/doctors", doctorsController.create);

routes.get("/clients", clientsController.index);
routes.post("/clients", clientsController.create);

routes.get("/attendance", attendance.index);
routes.post("/attendance", attendance.create);

export default routes;
