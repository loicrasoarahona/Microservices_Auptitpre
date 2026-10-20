import { StudentClientImpl } from "../clients/impl/StudentClientImpl.js";
import { StudentClient } from "../clients/student.client.js";

class ServiceSelector {
  public readonly studentClient: StudentClient;

  constructor() {
    this.studentClient = new StudentClientImpl();
  }
}

export default new ServiceSelector();
