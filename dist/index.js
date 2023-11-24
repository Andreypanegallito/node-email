"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const emailService_1 = require("./services/emailService");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/sendEmailFormContato", async (req, res) => {
    try {
        const { nome, email, assunto, mensagem } = req.body;
        const emailProps = {
            nome: nome,
            email: email,
            assunto: assunto,
            mensagem: mensagem,
        };
        const retorno = await (0, emailService_1.sendEmailFormContato)();
        if (retorno !== undefined && retorno === "Ok") {
            res.json({ status: "Ok", message: "E-mail enviado com sucesso" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao enviar o email" });
    }
});
app.listen(process.env.PORT, () => {
    console.log("Servidor da API iniciado na porta", process.env.PORT);
});
