const nodemailer = require('nodemailer');
const {credentials} = require("./keys")

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: credentials
});

module.exports = transporter;


// NODE_TLS_REJECT_UNAUTHORIZED='0' node index.js (comando para levantar el servidor y deje enviar correos > usar Gitbash)