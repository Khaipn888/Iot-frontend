const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const sendEmail = async (email, subject, text) => {
  try {
    // Khởi tạo OAuth2Client với Client ID và Client Secret
    const myOAuth2Client = new OAuth2Client(
      process.env.GOOGLE_MAILER_CLIENT_ID,
      process.env.GOOGLE_MAILER_CLIENT_SECRET
    );

    // Set Refresh Token vào OAuth2Client Credentials
    myOAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
    });

    /**
     * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
     * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
     */
    const myAccessTokenObject = await myOAuth2Client.getAccessToken();

    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token;

    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.ADMIN_EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });

    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: subject, // Tiêu đề email
      text: "Mật khẩu mới của bạn là: " + text, // Nội dung email
    };

    // Gọi hành động gửi email
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log("Email not send: ", error);
  }

  // try {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     port: 587,
  //     secure: true,
  //     auth: {
  //       user: "nguyenbasbinhtest@gmail.com",
  //       pass: "jxyouhrcgvartcgk",
  //     },
  //   });
  //   await transporter.sendMail({
  //     from: "SmartGardent@gmail.com",
  //     to: email,
  //     subject: subject,
  //     text: "Mật khẩu mới của bạn là: " + text,
  //   });
  //   console.log("email sent sucessfully");
  // } catch (error) {
  //   console.log(error, "email not sent");
  // }
};
module.exports = sendEmail;
