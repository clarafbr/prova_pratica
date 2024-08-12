import jwt from "jsonwebtoken"
import getToken from "./getToken.js"

const verifyToken = (request, response, next)=>{
    if(!request.headers.authorization){
        response.status(401).json({err: "Acesso negado"})
        return
    }

    const token = getToken(request)
    if(!token){
        response.status(401).json({err: "Acesso negado"})
        return
    }

    try{
        const verfied = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")
        request.usuario = verfied
        next()
    }catch(error){
        response.status(404).json({err: "Token Inválido"})
    }
}
export default verifyToken;