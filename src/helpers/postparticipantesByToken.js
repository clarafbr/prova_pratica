import jwt from "jsonwebtoken"

//assincrono
const criarParticipanteToken = async (participante, request, response) =>{
    //Criar o token
    const token = jwt.sign(
        {
            nome: participante.nome,
            id: participante.participante_id
        },
        "SENHASUPERSEGURAEDIFICIL" //senha
        )

    //Retornar/resposta o token
    response.status(200).json({
        message: "O participante foi registrado!",
        token: token,
        participanteId : participante.participante_id
    })

}

export default criarParticipanteToken;