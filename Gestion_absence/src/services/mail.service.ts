export interface MailService {
  sendMail(
    emailAddress: string,
    subject: string,
    content: String,
  ): Promise<void>;
}
