const validarPalestrante = (request, response, next) => {
    const { nome, email, expertise} = request.body;

    if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
    }
    if (!email) {
    response.status(400).json({ message: "O email é obrigatório" });
    return;
    }
    if (!expertise) {
    response.status(400).json({ message: "A expertise é obrigatória" });
    return;
    }
    if (!email.includes("@")) {
    response.status(409).json({ message: "Deve conter @ no seu email" });
    }
    next();
};

export default validarPalestrante;