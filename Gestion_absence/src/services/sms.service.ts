export interface SmsService {
  sendSms(phoneNumber: string, content: string): Promise<void>;
}
