import { response } from "express"
import jwt from "jsonwebtoken"
import conn from "../config/conn.js"

const getPalestranteByToken = async (token)=>{
    return new Promise((resolve, reject)=>{
        if(!token){
            response.status(401).json({err: "acesso negado!"})
            return
        }

        const decoded = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")

        const palestranteId = decoded.id

        const checkSql = /*sql*/ `SELECT * FROM palestrantes WHERE ?? = ?`
        const checkData = ["palestrante_id", palestranteId]
        conn.query(checkSql, checkData, (err, data)=>{
            if(err){
                reject({status: 500, message:"Erro ao buscar palestrante"})
            }else{
                resolve(data[0])
            }
        })
    })
}
export default getPalestranteByToken;