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

## 4º Instalar o typescript no projeto *(OPCIONAL)*
```
npm install --save-dev typescript ts-node
```

## 5º Configurar a compilação do typescript *(Só será necessário caso você faça o projeto com typescript)*
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
```
npm install cors --save-dev
```
