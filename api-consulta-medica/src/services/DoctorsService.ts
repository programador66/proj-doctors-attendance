import knex from "../database/connection";

interface IDoctors {
  nome: String;
  especialidade: String;
  crm: String;

}

class DoctorsService {
  async insert(doctors: IDoctors) {
    const begintransaction = await knex.transaction();

    const newDoc = await begintransaction("doctors").insert(doctors);

    if (!newDoc) {
      
      begintransaction.rollback();
      return { success: false, error: newDoc };
    }

    
    begintransaction.commit();
    return { success: true };
  }

  async getDoctors() {
    const doctor = await knex("doctors").select("*");
    return doctor;
  }

}

export default DoctorsService;
