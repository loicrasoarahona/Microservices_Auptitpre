import { MailService } from "../mail.service.js";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.resolve(__dirname, "../../../public/ptitpre.png");
const LOGO_CID = "ptitpre-logo";
const SCHOOL_PHONE_NUMBER = process.env.SCHOOL_PHONE_NUMBER;

export class MailServiceImpl implements MailService {
  public async sendMail(
    emailAddress: string,
    subject: string,
    content: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const signature = `
      <br/>
      <table cellpadding="0" cellspacing="0" style="margin-top: 16px;">
        <tr>
          <td style="padding-right: 12px;">
            <img src="cid:${LOGO_CID}" alt="Au P'tit Pré" width="70" />
          </td>
          <td style="border-left: 2px solid #ccc; padding-left: 12px;">
            <strong>Au P'tit Pré</strong><br/>
            ${SCHOOL_PHONE_NUMBER}
          </td>
        </tr>
      </table>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: emailAddress,
      subject: subject,
      html: content + signature,
      attachments: [
        {
          filename: "ptitpre.png",
          path: LOGO_PATH,
          cid: LOGO_CID,
        },
      ],
    });
  }
}
