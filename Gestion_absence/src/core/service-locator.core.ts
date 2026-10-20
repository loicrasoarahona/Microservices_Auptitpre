import { StudentClientImpl } from "../clients/impl/student.client.impl.js";
import { StudentClient } from "../clients/student.client.js";
import { AbsenceService } from "../services/absence.service.js";
import { AbsenceServiceImpl } from "../services/impl/absence.service.impl.js";
import { MailServiceImpl } from "../services/impl/mail.service.impl.js";
import { MailService } from "../services/mail.service.js";
import { SmsServiceImpl } from "../services/impl/sms.service.impl.js";
import { SmsService } from "../services/sms.service.js";

class ServiceLocator {
  public readonly studentClient: StudentClient;
  public readonly absenceService: AbsenceService;
  public readonly mailService: MailService;
  public readonly smsService: SmsService;

  constructor() {
    this.studentClient = new StudentClientImpl();
    this.absenceService = new AbsenceServiceImpl();
    this.mailService = new MailServiceImpl();
    this.smsService = new SmsServiceImpl();
  }
}

export default new ServiceLocator();
