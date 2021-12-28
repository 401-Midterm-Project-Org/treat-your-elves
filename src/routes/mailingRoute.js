const express = require('express')
const emailRouter = express.Router()
require('dotenv').config()

const cors = require('cors')

const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

emailRouter.use(bodyParser.urlencoded({extended: true}))
emailRouter.use(bodyParser.json())

emailRouter.post("/sendmail", cors(), async (req, res) => {
  let { text } = req.body;
  console.log(req.body)
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "test@test.com",
    subject: "test email",
    html: `<div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;">
    <h2>An Email Is Here!</h2>
    <p>${text}</p>
    <p>All the best, Elf Notification Squad</p>
    </div>`

  })
})

module.exports = emailRouter; 