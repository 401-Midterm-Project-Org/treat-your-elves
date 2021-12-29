const express = require('express')
const emailRouter = express.Router()
require('dotenv').config()

const cors = require('cors')

const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

emailRouter.use(bodyParser.urlencoded({extended: true}))
emailRouter.use(bodyParser.json())

emailRouter.post("/sendmail", cors(), async (req, res) => {
  console.log(req.body)
  let { to, subject, html } = req.body;
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
    to,
    subject,
    html
  })
})

module.exports = emailRouter; 