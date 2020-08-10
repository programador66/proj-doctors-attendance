import { Request, Response } from "express";
import AttendanceService from "../services/AttendanceService";

class AttendanceController {
  constructor() {}
  async create(request: Request, response: Response) {
    try {
      const attendance = new AttendanceService();

      const { newClient } = request.body;

      if (newClient) {
        const {
          nome,
          telefone,
          plano_de_saude,
          hora_atendimento,
          data_atendimento,
          doctors_id,
        } = request.body;

        const res = await attendance.insertAttentanceWithNewClient({
          nome,
          telefone,
          plano_de_saude,
          hora_atendimento,
          data_atendimento,
          doctors_id,
        });

        return response.status(201).json({
          msg: "Atendimento agendado com sucesso! ",
        });
      }

      const {
        clients_id,
        hora_atendimento,
        data_atendimento,
        doctors_id,
      } = request.body;

      const res = await attendance.insert({
        clients_id,
        hora_atendimento,
        data_atendimento,
        doctors_id,
      });

      return response.status(201).json({
        msg: "Atendimento agendado com sucesso!",
      });
    } catch (err) {
      return response.status(406).json({
        msg: "Erro no agendamento, por favor contatar o ADM",
        error: err.message,
      });
    }
  }

  async index(request: Request, response: Response) {
    const res = await new AttendanceService().getAttendance();
    return response.json(res);
  }
}

export default AttendanceController;
