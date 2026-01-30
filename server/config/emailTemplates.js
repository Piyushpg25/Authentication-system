export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f2f4f8;
      font-family: Arial, Helvetica, sans-serif;
    }

    .wrapper {
      width: 100%;
      padding: 40px 0;
    }

    .card {
      max-width: 520px;
      margin: auto;
      background: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    }

    .header {
      background: linear-gradient(135deg, #4f46e5, #22d172);
      padding: 28px;
      text-align: center;
      color: #ffffff;
      font-size: 22px;
      font-weight: bold;
    }

    .content {
      padding: 32px;
      color: #333333;
      font-size: 14px;
      line-height: 1.7;
    }

    .email {
      color: #4f46e5;
      font-weight: bold;
    }

    .otp-box {
      margin: 30px 0;
      text-align: center;
      background: #f4f7ff;
      border: 2px dashed #4f46e5;
      border-radius: 10px;
      padding: 18px;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #4f46e5;
    }

    .note {
      font-size: 13px;
      color: #666;
      text-align: center;
    }

    .footer {
      padding: 18px;
      background: #f9fafb;
      font-size: 12px;
      color: #888;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        Verify Your Email
      </div>

      <div class="content">
        Hello 👋,<br/><br/>

        You're almost there! Please verify your email address
        <span class="email">{{email}}</span> using the OTP below.

        <div class="otp-box">
          {{otp}}
        </div>

        <div class="note">
          This OTP is valid for <strong>24 hours</strong>.  
          Please do not share it with anyone.
        </div>
      </div>

      <div class="footer">
        © 2026 Your App. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #eef2f7;
      font-family: 'Segoe UI', Tahoma, sans-serif;
    }

    .container {
      width: 100%;
      padding: 50px 0;
    }

    .box {
      max-width: 520px;
      margin: auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 12px 35px rgba(0,0,0,0.1);
    }

    .top {
      padding: 26px;
      background: #111827;
      color: #ffffff;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }

    .body {
      padding: 34px;
      font-size: 14px;
      color: #333;
      line-height: 1.7;
    }

    .highlight {
      color: #22d172;
      font-weight: 600;
    }

    .otp {
      margin: 26px 0;
      background: #111827;
      color: #22d172;
      text-align: center;
      font-size: 26px;
      padding: 16px;
      border-radius: 8px;
      letter-spacing: 5px;
      font-weight: bold;
    }

    .warning {
      font-size: 13px;
      color: #b91c1c;
      text-align: center;
    }

    .bottom {
      background: #f3f4f6;
      padding: 16px;
      font-size: 12px;
      color: #6b7280;
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="box">
      <div class="top">
        Password Reset Request
      </div>

      <div class="body">
        We received a request to reset the password for  
        <span class="highlight">{{email}}</span>.

        <br/><br/>
        Use the OTP below to continue:

        <div class="otp">
          {{otp}}
        </div>

        <div class="warning">
          This OTP will expire in <strong>15 minutes</strong>.
        </div>
      </div>

      <div class="bottom">
        If you didn’t request this, please ignore this email.
      </div>
    </div>
  </div>
</body>
</html>
`;
