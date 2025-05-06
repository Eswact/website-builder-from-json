// require("dotenv").config();
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//     auth: {
//       user: `${process.env.SENDER_MAIL}`,
//       pass: `${process.env.SENDER_PASS}`
//     }
// });

// const sendFormMail = async function (formData) {
//   const mailOptions = {
//     from: `"Json Website" <${process.env.SENDER_MAIL}>`,
//     to: `${process.env.RECIPIENT_MAIL}`,
//     subject: 'Form Mesajı',
//     text: `
//       Adı Soyadı: ${formData.name}
//       E-posta: ${formData.email}
//       Mesaj: ${formData.message}
//       `
//   };
//   await transporter.sendMail(mailOptions);
// };

// module.exports = { sendFormMail };
