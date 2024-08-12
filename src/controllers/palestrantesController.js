
import {v4 as uuidv4} from "uuid";
import conn from "../config/conn.js";


import criarPalestranteToken from "../helpers/postPalestranteToken.js";

//CRIAR PALESTRANTES
export const postPalestrante = (request, response) => {
    const { nome, email, expertise} = request.body;

    const checkEmailSQL = /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ?`;
    const checkEmailData = ["email", email];
    conn.query(checkEmailSQL, checkEmailData, async (err, data) => {
    if (err) {
        console.log(err);
        response.status(500).json({ err: "Não foi possível buscar palestrante" });
    }
    if (data.length > 0) {
        response.status(409).json({ err: "O e-mail já esta em uso!" });
        return;
    }

    const id = uuidv4()

    const insertSql =/*sql*/`INSERT INTO palestrantes
        (??, ??, ??, ??) VALUES (?, ?, ?, ?)
    `
    const insertData = ["palestrante_id", "nome", "email", "expertise", id, nome, email, expertise]
    conn.query(insertSql, insertData, (err)=>{
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao cadastrar palestrante"})
            return
        }

        const palestranteSql = /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ?`
        const palestranteData = ["palestrante_id", id]
        conn.query(palestranteSql, palestranteData, async (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao selecionar palestrante"})
                return
            }
            const palestrante = data[0]

            try{
                await criarPalestranteToken(palestrante, request, response)
            }catch (error){
                console.error(error)
            }
        })
        //response.status(201).json({message: "Palestrante cadastrado com sucesso!"})
    })
    });
};

//LISTAR TODOS OS PALESTRANTES
export const getPalestrantes = (request, response) => {
    const query = "SELECT nome, email, expertise FROM palestrantes";

    conn.query(query, (err, results) => {
        if (err) return response.status(500).json({erro: "Erro ao listar os palestrantes"});
        response.status(200).json(results);
    });
};
