import express from "express";

import DoctorsController from "./controllers/DoctorsController";
import ClientsController from "./controllers/ClientsController";
import AttendanceController from "./controllers/AttendanceController";
import { celebrate, Segments, Joi } from "celebrate";

const routes = express.Router();
const doctorsController = new DoctorsController();
const clientsController = new ClientsController();
const attendance = new AttendanceController();

routes.get("/doctors", doctorsController.index);

//fiz o exemplo de validação com celebrate apenas na rota dos doctors para exemplificar
routes.post(
  "/doctors",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      especialidade: Joi.string().required(),
      crm: Joi.string().required(),
    }),
  }),
  doctorsController.create
);

routes.get("/clients", clientsController.index);
routes.post("/clients", clientsController.create);

routes.get("/attendance", attendance.index);
routes.post("/attendance", attendance.create);

routes.post("/report", attendance.getAttendanceBydate);

export default routes;
