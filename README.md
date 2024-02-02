# Node E-mail

Fiz esse projeto para poder ajudar com o envio de e-mails com o nodejs. Estou utilizando o nodemailer para fazer o envio de e-mails.
O processo é relativamente simples e fácil de se usar e adaptar ele em outros projetos. Ele poderá servir como base para algo maior.

## 1º Criando a pasta do projeto

Será necessári criar uma pasta com o nome do projeto, no meu caso eu coloquei como "node-email".

```
mkdir node-email
```

## 2º Entrar na pasta do projeto

```
cd node-email
```

## 3º Criar projeto do nodejs

```
npm init -y
```

## 4º Instalar o typescript no projeto _(OPCIONAL)_

```
npm install --save-dev typescript ts-node
```

## 5º Configurar a compilação do typescript _(Só será necessário caso você faça o projeto com typescript)_

Será necessário criar um arquivo `tsconfig.json` na raiz da pasta do projeto e adicionar o código abaixo.

```
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  },
  "include": [
    "*.ts",
    "index.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## 6º Instalar o express

Para realizar algumas funcionalidades do projeto será necessário instalar o express.

```
npm install express --save-dev
```

## 7º Instalar o cors

Para realizar algumas funcionalidades do projeto também será necessário instalar o cors.

```
npm install cors --save-dev
```

## 8º Ajustando o código

Cria um arquivo index.js na pasta raiz do projeto. O código vou deixar abaixo como funciona.

```
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
```

## 9º Instalar o nodemailer

Para realizar o envio utilizarei o nodemailer, por isso iremos instalar ele.

```
npm install nodemailer --save-dev
```

## 10º Criando o EmailService para enviar o e-mail

Eu separei a função responsável por enviar o e-mail para ficar melhor organizado e a compreensão ficar facilitada.

Estarei mostrando as 3 etapas para fazer

## 11º Importando e configurando o nodemailer

Para utilizar o nodemailer, temos que importar ele e configurar o nodemailer para que ele possa enviar o e-mail.

```
\\Importando o nodemailer
const nodeMailer = require("nodemailer");
```

Essa etapa abaixo de configuração do nodemailer, estou usando o smtp do google, pois é um serviço gratuito que a google disponibiliza.
Os dados do smtp do google são os seguintes:

- host: smtp.gmail.com
- port: 465
- secure: true
- auth:{user: "email", password: "password"}

Caso você tenha autenticação em 2 etapas, para acessar a conta do google, você terá que acessar com a senha de app. Nesse caso, você vai substituir a senha do seu e-mail pela senha que aparece na sua conta do google.

No link https://support.google.com/accounts/answer/185833 tem um guia da própria google como você configura a senha.

```
//Criando as configurações de comunicação do nodemailer
const transport = new nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "email",
    pass: "senha",
  },
});
```

## 12º Criando a função que vai enviar o e-mail

Nesse caso, eu criei uma função assíncrona, validando se o envio de e-mail vai ser concluído com sucesso, ou se vai ocorrer erros.

### Javascript

```
export const sendEmailFormContato = async () => {
  // Crie um objeto e-mail
  const emailObject = {
    from: "e-mail remetente", //aqui você coloca o e-mail que aparecerá como remetente
    to: "e-mail de destino", //aqui você coloca o e-mail que será enviado o e-mail
    subject: `titulo do e-mail`, //aqui você coloca o título do e-mail
    html: `<h1>Você tem uma nova mensagem! Mensagem em html </h1>`, // aqui você coloca a mensagem do e-mail em html
    text: `Você tem uma nova mensagem! \n Mensagem em text`, // aqui você coloca a mensagem do e-mail em text (quando html não é possivel ser visualizado)
  };

  // Aqui será é chamado a função do nodemailer para enviar o e-mail
  const retorno = await transport
    .sendMail(emailObject)
    .then(() => {
      return "Ok";
    })
    .catch((err) => {
      console.error("erro ao enviaro e-mail", err);
      return "erro";
    });

  return retorno;
};
```

### TypeScript

```
export const sendEmailFormContato = async (): Promise<string> => {
  // Crie um objeto e-mail
  const emailObject = {
    from: "e-mail remetente", //aqui você coloca o e-mail que aparecerá como remetente
    to: "e-mail de destino", //aqui você coloca o e-mail que será enviado o e-mail
    subject: `titulo do e-mail`, //aqui você coloca o título do e-mail
    html: `<h1>Você tem uma nova mensagem! Mensagem em html </h1>`, // aqui você coloca a mensagem do e-mail em html
    text: `Você tem uma nova mensagem! \n Mensagem em text`, // aqui você coloca a mensagem do e-mail em text (quando html não é possivel ser visualizado)
  };

  // Aqui será é chamado a função do nodemailer para enviar o e-mail
  const retorno = await transport
    .sendMail(emailObject)
    .then(() => {
      return "Ok";
    })
    .catch((err: string) => {
      console.error("erro ao enviaro e-mail", err);
      return "erro";
    });

  return retorno;
};
```

## 13º Código completo

Aqui está o código completo para ficar de melhor visualização.

### Javascript

```
\\Importando o nodemailer
const nodeMailer = require("nodemailer");

//Criando as configurações de comunicação do nodemailer
const transport = new nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "email",
    pass: "senha",
  },
});

//
export const sendEmailFormContato = async () => {
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
    .catch((err) => {
      console.error("erro ao enviaro e-mail", err);
      return "erro";
    });

  return retorno;
};

```

### TypeScript

```
\\Importando o nodemailer
const nodeMailer = require("nodemailer");

//Criando as configurações de comunicação do nodemailer
const transport = new nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "email",
    pass: "senha",
  },
});

//
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

```
