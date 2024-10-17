const nodemailer = require('nodemailer');
const fs = require('fs');
const {promisify} = require('util');
const { attachment } = require('express/lib/response');

require('dotenv').config();
const readFileAsync = promisify(fs.readFile);
// Set up Nodemailer
const transporter = nodemailer.createTransport({
    service:  process.env.SERVICE,
    auth:{
        user: process.env.EMAIL,
        pass :process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized: false
    }
  });


const applyJob = async (req, res) => {
  try {
      const { email } = req.body;
      console.log(email);

      const htmlTemplate = await readFileAsync('./views/index.ejs', 'utf-8');

      // Read multiple image attachments
      const imageAttachments = await Promise.all([
          //readFileAsync('./assets/images/bag.png'),
          //readFileAsync('./assets/images/youtube.png'),
          readFileAsync('./assets/images/twitter.png'),
          readFileAsync('./assets/images/ig.png'),
          readFileAsync('./assets/images/face.png'),
          readFileAsync('./assets/images/adain1.png'),
          readFileAsync('./assets/images/banner1.png'),

      ]);

      // Create attachments array
      const attachments = [
          // {
          //     filename: 'bag.png',
          //     content: imageAttachments[0],
          //     encoding: 'base64',
          //     cid: 'uniqueImageCID1', // Referenced in the HTML template
          // },
          // {
          //     filename: 'youtube.png',
          //     content: imageAttachments[1],
          //     encoding: 'base64',
          //     cid: 'uniqueImageCID2', // Referenced in the HTML template
          // },
          {
              filename: 'twitter.png',
              content: imageAttachments[0],
              encoding: 'base64',
              cid: 'uniqueImageCID3', // Referenced in the HTML template
          },
          {
            filename: 'ig.png',
            content: imageAttachments[1],
            encoding: 'base64',
            cid: 'uniqueImageCID4', // Referenced in the HTML template
        },
        {
          filename: 'face.png',
          content: imageAttachments[2],
          encoding: 'base64',
          cid: 'uniqueImageCID5', // Referenced in the HTML template
      },

      {
        filename: 'adain1.png',
        content: imageAttachments[3],
        encoding: 'base64',
        cid: 'uniqueImageCID6', // Referenced in the HTML template
    },

    {
        filename: 'banner1.png',
        content: imageAttachments[4],
        encoding: 'base64',
        cid: 'uniqueImageCID7', // Referenced in the HTML template
    },
      
      ];

      // Create email content
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: `${email}`, // Recipient email
          subject: 'Elevate Your Business with Our Innovative IT Solutions',
          html: htmlTemplate,
          attachments: attachments,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Respond to client
      res.status(200).json({ status: 'success', message: 'Application submitted successfully.' });

  } catch (error) {
      console.error('Error processing application:', error);
      res.status(500).send('Internal Server Error');
  }
};



  


module.exports = {applyJob}