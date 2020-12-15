const router=require('express').Router();
const nodemailer = require('nodemailer');

router.post('/send-email',async(req,res)=>{
    const {name,email,phone,message}= req.body;

    contentHTML=`
    <h1>User Information</h1>
    <ul>
        <li>Username: ${name}</li>
        <li>User Email: ${email}</li>
        <li>Phone: ${phone}</li>
    </ul>
    <p>${message}</p>
    `;

    const transporter=nodemailer.createTransport({
        pool:false,
        host:"smtpout.ss.net",
        port:5353,
        secure: false,
        auth:{
            user:'user@server.dn',
            pass:'password'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false}
    });

    await transporter.sendMail({
        from:"user@server.dn",
        to:'user1@server.dn',
        subject:'Website contact form',
        html:contentHTML
    //    text:'HiW!'

    },(error,info)=>{
        if(error){
            return console.log(error);
        }
        console.log(`Message Sent: ${info.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    });
    res.redirect('/success.html');
});

module.exports=router;