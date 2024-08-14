import { request } from "express";
import { v4 as uuidv4 } from "uuid";
import conn from "../config/conn.js";

import criarParticipanteToken from "../helpers/postparticipantesByToken.js";

//CRIAR PARTICIPANTE
export const postParticipante = (request, response) => {
    const { nome, email } = request.body;

  const checkEmailSQL = /*sql*/ `SELECT * FROM participantes WHERE ?? = ?`;
    const checkEmailData = ["email", email];
    conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
    if (err) {
        console.log(err);
        response.status(500).json({ err: "Não foi possível buscar participante" });
    }
    if (data.length > 0) {
        response.status(409).json({ err: "O e-mail já esta em uso!" });
        return;
    }

    const id = uuidv4();

    const insertSql = /*sql*/ `INSERT INTO participantes
        (??, ??, ??) VALUES (?, ?, ?)
    `;
    const insertData = ["participante_id", "nome", "email", id, nome, email];
    conn.query(insertSql, insertData, (err) => {
        if (err) {
        console.error(err);
        response.status(500).json({ err: "Erro ao cadastrar participante" });
        return;
        }

      const participanteSql = /*sql*/ `SELECT * FROM participantes WHERE ?? = ?`;
        const participanteData = ["participante_id", id];
        conn.query(participanteSql, participanteData, async (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao selecionar participante" });
            return;
        }
        const participante = data[0];

        try {
            await criarParticipanteToken(participante, request, response);
        } catch (error) {
            console.error(error);
        }
        });
    });
});
};

export const postInscricao = (request, response) => {
    const {nome, email} = request.body

    const inscricricaoSql = /*sql*/ `SELECT * FROM participantes WHERE ?? = ? AND ?? = ?`;
        const inscricricaoData = ["nome", nome, "email", email];
        conn.query(inscricricaoSql, inscricricaoData, async (err, data) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao buscar participante" });
            return;
        }

        if (data.length === 0) {
            response.status(404).json({ err: "O participánte deve estar cadastrado" });
            return;
        }

        const participante = data[0];

        try {
            await criarParticipanteToken(participante, request, response);
        } catch (error) {
            console.error(error);
        }

        return(201).json({message: "Inscrição realizada com sucesso!"})
    })
}