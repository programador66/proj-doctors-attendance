import { Request, Response } from "express";
import DoctorsService from "../services/DoctorsService";


class DoctorsController {
  async create(request: Request, response: Response) {

    try {

      const {nome, especialidade, crm} = request.body;

      const doc = {nome,especialidade,crm};
      const res = await new DoctorsService().insert(doc);

      return response.status(200).json({
        msg: "Cadastro realizado com sucesso!"
      })

    } catch (err) {
      return response.status(406).json({
        msg: "Erro na inserção do Doutor, por favor contatar o ADM",
        error: err.message
      })
    }

  }

  async index(request: Request, response: Response) {
   
    const res = await new DoctorsService().getDoctors();

    return response.json(res);
  }
}

export default DoctorsController;
