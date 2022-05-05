import nodemailer from 'nodemailer';


async function mail(){

    const hostname = "smtp.ethereal.email";
    const username = "broderick.kshlerin31@ethereal.email";
    const password = "5KeJUuRG4ntnEXc8DV";
  
    const transporter = nodemailer.createTransport({
      host: hostname,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: username,
        pass: password,
      },
      logger: true
    });

    const info = await transporter.sendMail({
        from: '"Sender Name" broderick.kshlerin31@ethereal.email',
        to: "broderick.kshlerin31@ethereal.email",
        subject: "Hello from node",
        text: "Hello world?",
        html: "<strong>Hello world?</strong>",
        headers: { 'x-myheader': 'test header' }
      });
    
      console.log("Message sent: %s", info.response);
    }

    export default mail