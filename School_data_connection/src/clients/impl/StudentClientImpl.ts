import axios, { AxiosInstance } from "axios";
import {
  ClassLevel,
  PaginationResultDto,
  Student,
  StudentParent,
} from "../../types/interfaces.js";
import { StudentClient } from "../student.client.js";
import { Request } from "express";

const baseUrlForGestionAbsence = process.env.SUBSTITUTE_STUDENTS_BASE_URL;
const baseUrlForOrientation = process.env.SUBSTITUTE_STUDENT_GRADES_BASE_URL;

export class StudentClientImpl implements StudentClient {
  studentClientForOrientation: StudentClientForOrientation;
  studentClientForGestionAbsence: StudentClientForGestionAbsence;

  constructor() {
    this.studentClientForOrientation = new StudentClientForOrientation();
    this.studentClientForGestionAbsence = new StudentClientForGestionAbsence();
  }

  public async getAll(filter?: any, request?: Request): Promise<Student[]> {
    const clientId = request?.headers["x-client-id"];
    if (clientId == "orientation_scolaire")
      return this.studentClientForOrientation.getAll();
    if (clientId == "gestion_absence")
      return this.studentClientForGestionAbsence.getAll();
    return [];
  }

  public async getById(id: number, request?: Request): Promise<Student | null> {
    const clientId = request?.headers["x-client-id"];
    if (clientId == "orientation_scolaire")
      return this.studentClientForOrientation.getById(id);
    if (clientId == "gestion_absence")
      return this.studentClientForGestionAbsence.getById(id);
    return null;
  }

  public async getAllPaginated(
    filter?: any,
    page?: number,
    request?: Request,
  ): Promise<PaginationResultDto<Student>> {
    const clientId = request?.headers["x-client-id"];
    if (clientId == "gestion_absence")
      return this.studentClientForGestionAbsence.getAllPaginated(filter, page);
    return { totalItems: 0, members: [] };
  }

  public async getParents(
    id: number,
    request: Request,
  ): Promise<StudentParent[]> {
    const clientId = request?.headers["x-client-id"];
    if (clientId == "orientation_scolaire")
      return this.studentClientForOrientation.getParents(id);
    if (clientId == "gestion_absence")
      return this.studentClientForGestionAbsence.getParents(id);
    return [];
  }

  public async getClassLevels(request: Request): Promise<ClassLevel[]> {
    const clientId = request?.headers["x-client-id"];
    if (clientId == "orientation_scolaire")
      return this.studentClientForOrientation.getClassLevels(request);
    if (clientId == "gestion_absence")
      return this.studentClientForGestionAbsence.getClassLevels(request);
    return [];
  }

  public async getStudentGrades(
    id: number,
    classLevel: string,
    request?: Request,
  ): Promise<void> {}
}

/********************************************************************
 ****************GESTION ABSENCE*************************************
 *********************************************************************/
class StudentClientForGestionAbsence implements StudentClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: baseUrlForGestionAbsence });
  }

  public async getAll(filter?: any, request?: Request): Promise<Student[]> {
    let url = `/students?`;
    if (filter)
      for (const field in filter) {
        url += `&${field}=${filter[field]}`;
      }
    const response = await this.http.get(url);
    return response.data;
  }

  public async getById(id: number, request?: Request): Promise<Student | null> {
    try {
      const url = "/students/" + id;
      const response = await this.http.get(url);
      return response.data;
    } catch (error) {}
    return null;
  }

  public async getAllPaginated(
    filter?: any,
    page?: number,
    request?: Request,
  ): Promise<PaginationResultDto<Student>> {
    let url = `/students/paginated?page=${page}`;
    delete filter.page;
    for (let field in filter) {
      url += `&${field}=${filter[field]}`;
    }
    const response = await this.http.get(url, {
      headers: { ...request?.headers },
    });
    return response.data;
  }

  public async getParents(id: number, req?: Request): Promise<StudentParent[]> {
    const url = `/students/${id}/parents`;
    const response = await this.http.get(url, { headers: { ...req?.headers } });
    return response.data;
  }

  public async getClassLevels(req?: Request): Promise<ClassLevel[]> {
    const url = `/class-levels`;
    const response = await this.http.get(url, { headers: { ...req?.headers } });
    return response.data;
  }

  public async getStudentGrades(
    id: number,
    classLevel: string,
    request?: Request,
  ): Promise<void> {
    return;
  }
}

/********************************************************************
 ****************ORIENTATION*************************************
 *********************************************************************/
class StudentClientForOrientation implements StudentClient {
  public async getAll(filter?: any, request?: Request): Promise<Student[]> {
    return [];
  }

  public async getById(id: number, request?: Request): Promise<Student | null> {
    return null;
  }

  public async getAllPaginated(
    filter?: any,
    page?: number,
    request?: Request,
  ): Promise<PaginationResultDto<Student>> {
    return { totalItems: 0, members: [] };
  }

  public async getParents(id: number): Promise<StudentParent[]> {
    return [];
  }

  public async getClassLevels(req: Request): Promise<ClassLevel[]> {
    return [];
  }

  public async getStudentGrades(
    id: number,
    classLevel: string,
    request?: Request,
  ): Promise<void> {
    return;
  }
}
