const nodeMailer = require("nodemailer");

const transport = new nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "email",
    pass: "senha",
  },
});

export const sendEmailFormContato = async (): Promise<string> => {
  // Crie um objeto e-mail
  const emailObject = {
    from: "e-mail remetente", //aqui você coloca o e-mail que aparecerá como remetente
    to: "e-mail de destino", //aqui você coloca o e-mail que será enviado o e-mail
    subject: `titulo do e-mail`, //aqui você coloca o título do e-mail
    html: `<h1>Você tem uma nova mensagem! Mensagem em html </h1>`, // aqui você coloca a mensagem do e-mail em html
    text: `Você tem uma nova mensagem! \n Mensagem em text`, // aqui você coloca a mensagem do e-mail em text (quando html não é possivel ser visualizado)
  };

  const retorno = await transport
    .sendMail(emailObject)
    .then(() => {
      return "Ok";
    })
    .catch((err: any) => {
      console.error("erro ao enviaro e-mail", err);
      return "erro";
    });

  return retorno;
};
