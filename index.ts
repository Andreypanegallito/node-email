import express, { Request, Response } from "express";
import cors from "cors";
import { sendEmailFormContato } from "./services/emailService";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/sendEmailFormContato", async (req: Request, res: Response) => {
  try {
    const { nome, email, assunto, mensagem } = req.body;
    const emailProps = {
      nome: nome,
      email: email,
      assunto: assunto,
      mensagem: mensagem,
    };
    const retorno = await sendEmailFormContato();
    if (retorno !== undefined && retorno === "Ok") {
      res.json({ status: "Ok", message: "E-mail enviado com sucesso" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar o email" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Servidor da API iniciado na porta", process.env.PORT);
});
