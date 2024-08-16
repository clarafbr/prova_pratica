export const validarFeedback = (request, response, next) => {

    const { evento_id, participante_id, nota, comentario } = request.body;
    if (!evento_id) {
        response.status(400).json({ message: "O ID do evento é obrigatório" });
    }
    if (!participante_id) {
        response.status(400).json({ message: "O ID do participante é obrigatório" });
    }
    if (!nota) {
        response.status(400).json({ message: "A nota é obrigatória" });
    }
    if (!comentario) {
        response.status(400).json({ message: "O comentário é obrigatório" });
    }

    next();
};