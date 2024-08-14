import {v4 as uuidv4} from "uuid";
import conn from "../config/conn.js";
import getPalestranteByToken from "../helpers/getPalestrantesByToken.js"
import getToken from "../helpers/getToken.js"

import criarEventosToken from "../helpers/postEventos.js";

//CRIAR EVENTOS
export const postEvento = (request, response) => {
    const { titulo, data_evento} = request.body;

    const token = getToken(request)
    const palestrante = getPalestranteByToken(token)

    if(!titulo){
        response.status(400).json("O título do evento é obrigatório!")
        return
    }
    if(!data_evento){
        response.status(400).json("A data do evento é obrigatória!")
        return
    }

    const id = uuidv4()
    const palestrante_id = palestrante.palestrante_id

    const insertSql =/*sql*/`INSERT INTO eventos_registrados (??, ??, ??, ??) VALUES (?, ?, ?, ?)
    `
    const insertData = ["titulo", "data_evento" , id, titulo, data_evento, palestrante_id]
    conn.query(insertSql, insertData, (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao criar evento"})
            return
        }

        const eventoSql = /*sql*/ `SELECT * FROM eventos_registrados WHERE ?? = ?`
        const eventoData = ["evento_id", id]
        conn.query(eventoSql, eventoData, async (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao selecionar evento"})
                return
            }
            const evento = data[0]

            try{
                await criarEventosToken(evento, request, response)
            }catch (error){
                console.error(error)
            }
        })
    })
};

//LISTAR TODOS OS EVENTOS
export const getEventos = (request, response) => {
    const query = "SELECT titulo, data_evento FROM eventos_registrados";

    conn.query(query, (err, results) => {
        if (err) return response.status(500).json({erro: "Erro ao listar os eventos"});
        response.status(200).json(results);
    });
};