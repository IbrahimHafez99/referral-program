export const purchaseNotifyHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Congratulations on a Purchase Made With Your Referral!</title>
    <style>
      /* Internal CSS styles */
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        font-size: 24px;
        color: #333;
        margin: 0;
      }
      .body {
        font-size: 16px;
        color: #555;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .cta {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.2s ease-in-out;
      }
      .cta:hover {
        background-color: #0069d9;
      }
      @media screen and (max-width: 600px) {
        .container {
          border-radius: 0;
          box-shadow: none;
          padding: 10px;
        }
        .header h1 {
          font-size: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Congratulations on Your Referral Purchase!</h1>
      </div>
      <div class="body">
        <p>Dear valued customer,</p>
        <p>We wanted to take a moment to congratulate you on a recent purchase made using your referral code. We greatly appreciate your business and hope that you are enjoying the service.</p>
        
        <p>Thank you again for your loyalty and support. We look forward to serving you in the future.</p>
      </div>
    </div>
  </body>
</html>

`;

export const verficationHTML = (token: string) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verification Email</title>
    <style>
      body {
        background-color: #f2f2f2;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        font-size: 24px;
        margin-top: 0;
      }
      p {
        margin-bottom: 1em;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #0062cc;
      }
      
      /* Responsive styles */
      @media only screen and (max-width: 768px) {
        .container {
          padding: 10px;
        }
        h1 {
          font-size: 20px;
        }
        p {
          font-size: 14px;
        }
        .button {
          font-size: 14px;
        }
      }
      @media only screen and (max-width: 480px) {
        .container {
          max-width: 100%;
        }
        h1 {
          font-size: 18px;
        }
        p {
          font-size: 12px;
        }
        .button {
          font-size: 12px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Verify Your Email Address</h1>
      <p>Please click the button below to verify your email address:</p>
      <a href="http://localhost:3000/user/verify/${token}" class="button">Verify Email Address</a>
    </div>
  </body>
</html>
`;
