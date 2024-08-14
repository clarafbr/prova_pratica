import jwt from "jsonwebtoken"

//assincrono
const criarEventosToken = async (evento, request, response) =>{
    //Criar o token
    const token = jwt.sign(
        {
            titulo: evento.titulo,
            id: evento.evento_id
        },
        "SENHASUPERSEGURAEDIFICIL" //senha
        )

    //Retornar/resposta o token
    response.status(200).json({
        message: "O evento foi criado!",
        token: token,
        eventoId : evento.evento_id
    })

}

export default criarEventosToken;