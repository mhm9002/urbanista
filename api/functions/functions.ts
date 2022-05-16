import * as nodemailer from 'nodemailer';

const sendMail = async (to:string, subject:string, body:string )=>{
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from: 'Urbanista Online Magazine',
            to, subject, text:body

        })

        console.log(info)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}


export default {
	sendMail
};
