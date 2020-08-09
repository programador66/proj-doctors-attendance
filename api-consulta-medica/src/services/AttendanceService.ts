import knex from "../database/connection";

interface IAttendance {
  hora_atendimento: String,
  data_atendimento: String,
  doctors_id: Number,
  clients_id:Number
}

interface IAttendanceNewClient {
  nome: String,
  telefone: String,
  plano_de_saude: String,
  hora_atendimento: String,
  data_atendimento: String,
  doctors_id: Number
}

class AttendanceService {
  async insert(attendance: IAttendance) {
    const begintransaction = await knex.transaction();

    const newAttendance = await begintransaction("attendance").insert(attendance);

    if (!newAttendance) {
      
      begintransaction.rollback();
      return { success: false, error: newAttendance };
    }
   
    begintransaction.commit();
    return { success: true };
  }

  async getAttendance() {
    const doctor = await knex("attendance").select("*");
    return doctor;
  }

  async insertAttentanceWithNewClient(attendance: IAttendanceNewClient) {

    const begintransaction = await knex.transaction();
    const {nome, plano_de_saude, telefone} = attendance ;

    const clientdb = await begintransaction("clients").insert({nome, plano_de_saude, telefone});

    if (!clientdb) {
      return { success: false, error: "Erro na inserção de cliente" };
    }  

    const {hora_atendimento, data_atendimento, doctors_id} = attendance;

    const att = {clients_id:clientdb[0],hora_atendimento, data_atendimento, doctors_id};

    const newAttendance = await begintransaction("attendance").insert(att);

    if (!newAttendance) {
      
      begintransaction.rollback();
      return { success: false, error: "Erro na inserçã de atendimentos" };
    }
   
    begintransaction.commit();
    return { success: true };
  }

}

export default AttendanceService;
