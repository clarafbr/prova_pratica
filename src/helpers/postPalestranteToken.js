import jwt from "jsonwebtoken"

//assincrono
const criarPalestranteToken = async (palestrante, request, response) =>{
    //Criar o token
    const token = jwt.sign(
        {
            nome: palestrante.nome,
            id: palestrante.palestrante_id
        },
        "SENHASUPERSEGURAEDIFICIL" //senha
        )

    //Retornar/resposta o token
    response.status(200).json({
        message: "O palestrante está cadastrado!",
        token: token,
        palestranteId : palestrante.palestrante_id
    })

}

export default criarPalestranteToken;