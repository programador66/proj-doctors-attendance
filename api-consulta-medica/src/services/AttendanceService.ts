import knex from "../database/connection";

interface IAttendance {
  hora_atendimento: String;
  data_atendimento: String;
  doctors_id: Number;
  clients_id: Number;
}

interface IAttendanceNewClient {
  nome: String;
  telefone: String;
  plano_de_saude: String;
  hora_atendimento: String;
  data_atendimento: String;
  doctors_id: Number;
}

class AttendanceService {
  async insert(attendance: IAttendance) {
    const begintransaction = await knex.transaction();

    const newAttendance = await begintransaction("attendance").insert(
      attendance
    );

    if (!newAttendance) {
      begintransaction.rollback();
      return { success: false, error: newAttendance };
    }

    begintransaction.commit();
    return { success: true };
  }

  async getAttendance(data: String) {
    const doctor = await knex
      .select(
        "clients.nome as paciente",
        "clients.plano_de_saude",
        "clients.telefone",
        "doctors.nome as medico",
        "doctors.especialidade",
        "attendance.hora_atendimento",
        "attendance.data_atendimento"
      )
      .from("attendance")
      .innerJoin("clients", "attendance.clients_id", "clients.id")
      .innerJoin("doctors", "attendance.doctors_id", "doctors.id")
      .where("attendance.data_atendimento", "=", data);
    return doctor;
  }

  async insertAttentanceWithNewClient(attendance: IAttendanceNewClient) {
    const begintransaction = await knex.transaction();
    const { nome, plano_de_saude, telefone } = attendance;

    const clientdb = await begintransaction("clients").insert({
      nome,
      plano_de_saude,
      telefone,
    });

    if (!clientdb) {
      return { success: false, error: "Erro na inserção de cliente" };
    }

    const { hora_atendimento, data_atendimento, doctors_id } = attendance;

    const att = {
      clients_id: clientdb[0],
      hora_atendimento,
      data_atendimento,
      doctors_id,
    };

    const newAttendance = await begintransaction("attendance").insert(att);

    if (!newAttendance) {
      begintransaction.rollback();
      return { success: false, error: "Erro na inserçã de atendimentos" };
    }

    begintransaction.commit();
    return { success: true };
  }

  async getReport(data_inicial: String, data_final: String) {
    const doctor = await knex
      .select(
        "clients.nome as paciente",
        "clients.plano_de_saude",
        "clients.telefone",
        "doctors.nome as medico",
        "doctors.especialidade",
        "attendance.hora_atendimento",
        "attendance.data_atendimento"
      )
      .from("attendance")
      .innerJoin("clients", "attendance.clients_id", "clients.id")
      .innerJoin("doctors", "attendance.doctors_id", "doctors.id")
      .whereBetween("attendance.data_atendimento", [data_inicial, data_final]);
    return doctor;
  }
}

export default AttendanceService;
