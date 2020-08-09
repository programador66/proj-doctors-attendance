import { Request, Response } from "express";
import ClientsService from "../services/ClientsService";


class ClientsController {
  async create(request: Request, response: Response) {

    try {

      const {nome, telefone, plano_de_saude} = request.body;

      const cli = {nome, telefone, plano_de_saude};
      const res = await new ClientsService().insert(cli);

      return response.status(200).json({
        msg: "Cadastro realizado com sucesso!"
      })

    } catch (err) {
      return response.status(406).json({
        msg: "Erro na inserção do Client, por favor contatar o ADM",
        error: err.message
      })
    }

  }

  async index(request: Request, response: Response) {
   
    const res = await new ClientsService().getClients();

    return response.json(res);
  }
}

export default ClientsController;
