import mysqlPool from "../config/mysqlConnect.js";
import { handleError } from "../helpers/error.js";
import { v4 as uuidv4 } from "uuid";


export const Createfeedback = (request, response) => {
    const { evento_id, participante_id, nota, comentario } = request.body;
    
    if (typeof nota !== 'number' || nota < 0 || nota > 5) {
    return response.status(400).json({ message: "Nota deve ser um número entre 0 e 5." });
    }

    const id = uuidv4();
    const insertQuery = `
        INSERT INTO feedbacks (id, evento_id, participante_id, nota, comentario) 
        VALUES (?, ?, ?, ?, ?)
    `;

    mysqlPool.query(insertQuery, [id, evento_id, participante_id, nota, comentario],
        (err, result) => {
            if (err) return handleError(response, err, "Erro ao criar feedback");
            response.status(201).json({ message: "Feedback criado com sucesso!", id });
        }
    );
};

export const getFeedback= (request, response) => {
    const query = `SELECT nota, comentario FROM feedbacks`;

    mysqlPool.query(query, (err, results) => {
    if (err) return handleError(response, err, "Erro ao tentar listar feedback");
    
    if (results.length === 0) {
        return res.status(404).json({ message: "Nenhum feedback foi encontrado" });
    }
    response.status(200).json(results);
    });
};