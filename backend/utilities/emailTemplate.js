import user from "../models/user.js"

export const getResetPasswordTemplate = (username, resetUrl) => `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Password Reset</title>
    <style type="text/css" rel="stylesheet" media="all">
        @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");

        body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
            background-color: #f2f4f6;
            color: #51545e;
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
        }

        a {
            color: #3869d4;
            text-decoration: none;
        }

        td {
            word-break: break-word;
        }

        .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
        }

        h1 {
            margin-top: 0;
            color: #333333;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
        }

        p {
            font-size: 16px;
            line-height: 1.625;
            margin: 0.4em 0 1.1875em;
        }

        .button {
            background-color: #22bc66;
            border-top: 10px solid #22bc66;
            border-right: 18px solid #22bc66;
            border-bottom: 10px solid #22bc66;
            border-left: 18px solid #22bc66;
            display: inline-block;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
            padding: 10px 18px;
        }

        .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            text-align: center;
        }

        .content-cell {
            padding: 45px;
        }

        .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #f2f4f6;
        }

        .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            background-color: #ffffff;
        }

        .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            text-align: center;
            color: #a8aaaf;
        }

        .email-footer p {
            font-size: 13px;
        }

        .align-center {
            text-align: center;
        }

        /* Başlığı gri ve ortalanmış yapalım */
        .email-masthead {
            text-align: center;
            padding: 25px 0;
        }

        .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #a8aaaf;
            text-decoration: none;
        }

        @media only screen and (max-width: 600px) {
            .email-body_inner,
            .email-footer {
                width: 100% !important;
            }
        }
    </style>
</head>

<body>
    <span class="preheader">Use this link to reset your password. The link is only valid for 30 minutes.</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="email-masthead">
                            <a href="https://GetNow.com" class="f-fallback email-masthead_name">
                                GetNow
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td class="content-cell">
                                        <h1>Hi ${username},</h1>
                                        <p>You recently requested to reset your password for your GetNow account. Use the button below to reset it.</p>
                                        <p><strong>This password reset is only valid for the next 30 minutes.</strong></p>
                                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                            <tr>
                                                <td align="center">
                                                    <a href="${resetUrl}" class="button">Reset your password</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <p>If you did not request a password reset, please ignore this email or <a href="{{support_url}}">contact support</a> if you have questions.</p>
                                        <p>Thanks, <br>The GetNow team</p>
                                        <table class="body-sub" role="presentation">
                                            <tr>
                                                <td>
                                                    <p class="f-fallback sub">If you're having trouble with the button above, copy and paste the URL below into your web browser.</p>
                                                    <p class="f-fallback sub"><a href="${resetUrl}">${resetUrl}</a></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td class="content-cell" align="center">
                                        <p class="f-fallback sub align-center">GetNow<br>1234 Street Rd.<br>Suite 1234</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>

`;