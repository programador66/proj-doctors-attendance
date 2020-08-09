import knex from "../database/connection";

interface IClients {
  nome: String;
  telefone: String;
  plano_de_saude: String;

}

class ClientssService {
  async insert(clients: IClients) {
    const begintransaction = await knex.transaction();

    const newClient = await begintransaction("clients").insert(clients);

    if (!newClient) {
      
      begintransaction.rollback();
      return { success: false, error: newClient };
    }
    
    begintransaction.commit();
    return { success: true };
  }

  async getClients() {
    const client = await knex("clients").select("*");
    return client;
  }

}

export default ClientssService;
