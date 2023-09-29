import dotenv from "dotenv"
import nodemailer from 'nodemailer';
import Mail from "../models/mail.js";
import Mailgen from 'mailgen';
import mailValidator from "../validation/mail.js";

dotenv.config()
const {APP_MAIL} = process.env;
const {APP_PASSWORDS}= process.env;


export const emailtoCandicate = async(req, res)=>{
        try {
            const {error} = mailValidator.validate(req.body, {abortEarly: false}); 
            if (error){
                return res.status(400).json({
                    message: error.details.map(err => err.message),
                })
            }
        const data = await Mail.create(req.body);
        if (!data){
            return res.status(404).json({
                message: "Import infor not successful",
            })
        }    

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
                name: "Itecho",
                link:"http://Itecho.js",
            }
        })
        let response = {
            body:{
                name: data.candidateName,
                intro: data.intro,
                table: {
                    data: [
                        {
                            Link: data.linkTest
                        }
                    ]
                },
                outro:data.outro
            }
        }
        let mail = MailGenerator.generate(response)
        let message ={
            from: APP_MAIL,
            to: data.userEmail,
            subject: "Test",
            html: mail
        }

        transporter.sendMail(message).then(()=>{
            return res.status(201).json({
                msg:"Email sent successfully"
            })
        })
            
        } catch (error) {
            return res.status(500).json({
                name: error.name,
                message: error.message,
            });
        }

}