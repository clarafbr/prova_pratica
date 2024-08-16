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
    if(!palestrante_id){
        response.status(400).json("O palestrante do evento é obrigatório!")
        return
    }

    const id = uuidv4()
    const palestrante_id = palestrante.palestrante_id

    const insertSql =/*sql*/`INSERT INTO eventos_registrados (??, ??, ??, ??) VALUES (?, ?, ?, ?)
    `
    const insertData = ["titulo", "data_evento", "palestrante_id", id, titulo, data_evento, palestrante_id]
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

//ATUALIZAR EVENTO
export const updateEventos = (request, response) => {
    const {id}= request.params
    const {titulo, data_evento, palestrante_id} = request.body
    if (! titulo){
        response.status(400).json({message: "O título é obrigatório"})
        return
    }
    if (! data_evento){
        response.status(400).json({message: "A data do evento é obrigatória"})
        return
    }
    if (! palestrante_id){
        response.status(400).json({message: "O ID do palestrante é obrigatório"})
        return
    }

    const checkSql = /*sql*/`SELECT * FROM eventos_registrados WHERE evento_id = "${id}"`
    conn.query(checkSql, (err, data)=>{
        if(err){
            console.log(err)
            response.status(500).json({message: "Erro ao buscar evento"})
            return
        }
        if(data.length === 0){
            response.status(404).json({message: "Evento não encontrado"})
            return
        }

        const idCheckSql = /*sql*/`SELECT * FROM eventos_registrados WHERE evento_id != "${id}"`
        conn.query(idCheckSql, (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao verificar evento"})
                return 
            }
            if(data.length === 0){
                return response.status(409).json({message: "Este evento não está cadastrado"})
            }

            const updateSql = /*sql*/`UPDATE eventos_registrados SET 
            titulo = "${titulo}", data_evento = "${data_evento}", palestrante_id = "${palestrante_id}"
            WHERE evento_id = "${id}"
            `
            conn.query(updateSql, (err)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({message: "Erro ao atualizar evento"})
                    return
                }
                response.status(200).json({message: "Evento atualizado com sucesso!"})
            })
    })
    })
};

//DELETAR EVENTO
export const deleteEventos = (request, response) => { 
    const {id}= request.params
    const deleteSql = /*sql*/`DELETE FROM eventos_registrados WHERE evento_id = "${id}"`

    conn.query(deleteSql, (err, info)=>{
        if(err){
            console.error(err)
            return response.status(500).json({message: "Erro ao deletar evento"})
        }
        if(info.affectedRows === 0){
            return response.status(500).json({message: "Evento não encontrado"})
        }

        response.status(204).send("Evento excluído!")
    })
};