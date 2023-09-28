import dotenv from "dotenv"
import nodemailer from 'nodemailer';
import Mail from "../models/job.js";
import Mailgen from 'mailgen';

dotenv.config()
const {APP_MAIL} = process.env;
const {APP_PASSWORDS}= process.env;


export const emailtoCandicate = (req, res)=>{
        const {userEmail} = req.body;
        let config = {
            service: 'gmail',
            auth:{
                user: APP_MAIL,
                pass: APP_PASSWORDS
            }
        }
        let transporter = nodemailer.createTransport(config);
    
        let MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: "Mailgen",
                link:"http://mailgen.js",
            }
        })
        let response = {
            body:{
                name: "Tai",
                intro: "You need to access this link to do test",
                table: {
                    data: [
                        {
                            Link: "This link in here"
                        }
                    ]
                },
                outro:"Thanks for do this test"
            }
        }
        let mail = MailGenerator.generate(response)
        let message ={
            from: APP_MAIL,
            to: userEmail,
            subject: "Test",
            html: mail
        }

        transporter.sendMail(message).then(()=>{
            return res.status(201).json({
                msg:"You should receive a email"
            })
        }).catch(error=> {
            return res.status(500).json({
                name: error.name,
                message: error.message,
            });
    })
}