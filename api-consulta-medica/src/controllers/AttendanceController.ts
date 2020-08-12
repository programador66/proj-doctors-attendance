import { Request, Response } from "express";
import AttendanceService from "../services/AttendanceService";
import moment from "moment";

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

        if (
          nome == "" ||
          telefone == "" ||
          plano_de_saude == "" ||
          hora_atendimento == "" ||
          data_atendimento == "" ||
          doctors_id == ""
        ) {
          throw new Error("Campos De entrada Nulos!");
        }
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
      if (
        clients_id == "" ||
        hora_atendimento == "" ||
        data_atendimento == "" ||
        doctors_id == ""
      ) {
        throw new Error("Campos De entrada Nulos!");
      }
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
    const data_atual = moment().locale("pt-br").format("L");
    const res = await new AttendanceService().getAttendance(String(data_atual));
    return response.status(200).json(res);
  }

  async getAttendanceBydate(request: Request, response: Response) {
    try {
      const { data_inicial, data_final } = request.body;
      const res = await new AttendanceService().getReport(
        data_inicial,
        data_final
      );

      return response.status(200).json({
        success: true,
        data: res,
      });
    } catch (err) {
      return response.status(406).json({
        success: false,
        error: err.message,
        msg: "Erro na listagem do relatório",
      });
    }
  }
}

export default AttendanceController;
