import nodemailer from 'nodemailer'


export const sendEmail = (receiver_email, code, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'santosblogapp@gmail.com', //blogapp_2024
                pass: 'ymbb otnn gxda xbik' //ymbb otnn gxda xbik and BlogApp_2024_4444
            }
        })

        let mailOptions = {
            from: 'santosblogapp@gmail.com',
            to: receiver_email,
            subject: 'Reset Password',
            text: 'code to use to reset your password',
            html: `<h2>${code}</h2>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('error in the sendMail util', err)
                return res.status(400).json({ error : 'error in sending the email'})
            } else {
                console.log("Email sent", info.response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}
