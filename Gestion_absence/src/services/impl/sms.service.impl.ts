import axios from "axios";
import { SmsService } from "../sms.service.js";

const ORANGE_TOKEN_URL = process.env.ORANGE_TOKEN_URL;
const ORANGE_AUTHORIZATION_HEADER = process.env.ORANGE_AUTHORIZATION_HEADER;
const ORANGE_SMS_URL = process.env.ORANGE_SMS_URL;
const ORANGE_SENDER_ADDRESS = process.env.ORANGE_SENDER_ADDRESS;

interface OrangeTokenResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
  scope: string;
}

function toTelAddress(phoneNumber: string): string {
  const digits = phoneNumber.replace(/^tel:/, "").replace(/^(\+|00)/, "");
  return `tel:+${digits}`;
}

export class SmsServiceImpl implements SmsService {
  private accessToken: string | null = null;
  private accessTokenExpiresAt = 0;

  public async sendSms(phoneNumber: string, content: string): Promise<void> {
    const token = await this.getAccessToken();
    const address = toTelAddress(phoneNumber);

    await axios.post(
      `${ORANGE_SMS_URL}/outbound/${encodeURIComponent(ORANGE_SENDER_ADDRESS!)}/requests`,
      {
        outboundSMSMessageRequest: {
          address,
          senderAddress: ORANGE_SENDER_ADDRESS,
          outboundSMSTextMessage: { message: content },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.accessTokenExpiresAt) {
      return this.accessToken;
    }

    const result = await axios.post<OrangeTokenResponse>(
      ORANGE_TOKEN_URL!,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: ORANGE_AUTHORIZATION_HEADER!,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      },
    );

    this.accessToken = result.data.access_token;
    const expiresInSeconds = parseInt(result.data.expires_in);
    // marge de sécurité de 60s pour renouveler avant expiration réelle
    this.accessTokenExpiresAt = Date.now() + (expiresInSeconds - 60) * 1000;

    return this.accessToken;
  }
}
