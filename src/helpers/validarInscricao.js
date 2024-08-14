const validarInscricao = (request, response, next) => {
    const { nome, email} = request.body;

    if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
    }
    if (!email) {
    response.status(400).json({ message: "O email é obrigatório" });
    return;
    }
    if (!email.includes("@")) {
    response.status(409).json({ message: "Deve conter @ no seu email" });
    }
    next();
};

export default validarInscricao;