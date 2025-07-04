import { _env } from 'src/env';
import nodemailer from 'nodemailer';
export function sendEmailVerification ( data: { link: string, email: string; } ) {
  const myEmail = 'kyleigh.reinger3@ethereal.email';
  const config = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: myEmail,
      pass: _env.SMTP_PASSWRD
    }
  };
  const transporter = nodemailer.createTransport( config );

  return ( async () => {
    const { email, link } = data;
    const info = await transporter.sendMail( {
      from: myEmail,
      to: email,
      subject: 'Confirme seu cadastro na Pixit',
      html: `
<table cellpadding="0" cellspacing="0" width="100%" style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
  <tr>
    <td align="center">
      <table cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="padding: 40px; text-align: center;">
            <h2 style="color: #333333; margin-bottom: 20px;">Confirme seu cadastro</h2>
            <p style="color: #555555; font-size: 16px; line-height: 1.5;">
              Obrigado por se registrar na <strong>Pixit</strong>.<br>
              Para ativar sua conta, confirme seu e-mail clicando no botão abaixo.
            </p>
            <a href="${link}" style="display: inline-block; margin-top: 30px; padding: 12px 24px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Confirmar E-mail
            </a>
            <p style="color: #999999; font-size: 12px; margin-top: 30px;">
              Este link expira em 15 minutos.<br>
              Se você não solicitou este cadastro, pode ignorar este e-mail.
            </p>
          </td>
        </tr>
      </table>
      <p style="color: #aaaaaa; font-size: 12px; margin-top: 20px;">
        &copy; ${new Date().getFullYear()} Pixit. Todos os direitos reservados.
      </p>
    </td>
  </tr>
</table>
`
    } );
    return await nodemailer.getTestMessageUrl( info ) as string;
  } )();
};