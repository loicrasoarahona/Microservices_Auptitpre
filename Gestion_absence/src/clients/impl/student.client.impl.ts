import axios, { AxiosInstance } from "axios";
import { StudentClient } from "../student.client.js";
import {
  ClassLevelDto,
  ParentDto,
  PaginatedResultDto,
  StudentDto,
} from "../../types/dto.js";
import { Request } from "express";

const SCHOOL_STUDENTS_URL = process.env.SCHOOL_STUDENTS_URL;

export class StudentClientImpl implements StudentClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({ baseURL: SCHOOL_STUDENTS_URL });
  }

  public async findAllUsers(
    filter: {
      class_level?: number;
      name?: string;
    },
    request: Request,
  ): Promise<StudentDto[]> {
    let url = "/students?";
    for (const key in filter) {
      if ((filter as any)[key] != undefined) {
        url += `&${key}=${(filter as any)[key]}`;
      }
    }
    const result = await this.http.get(url, { headers: request.headers });
    return result.data;
  }

  public async findAllUsersPaginated(
    filter: {
      class_level?: number;
      name?: string;
      page?: number;
      limit?: number;
    },
    request: Request,
  ): Promise<PaginatedResultDto<StudentDto>> {
    let url = "/students/paginated?";
    for (const key in filter) {
      if ((filter as any)[key] != undefined) {
        url += `&${key}=${(filter as any)[key]}`;
      }
    }
    const result = await this.http.get(url, { headers: request.headers });
    return result.data;
  }

  public async findById(id: number, request: Request): Promise<StudentDto> {
    const result = await this.http.get(`/students/${id}`, {
      headers: request.headers,
    });
    return result.data;
  }

  public async findAllClassLevels(request: Request): Promise<ClassLevelDto[]> {
    const result = await this.http.get("/class-levels", {
      headers: request.headers,
    });
    return result.data;
  }

  public async findParents(
    id: number,
    request: Request,
  ): Promise<ParentDto[]> {
    const url = `/students/${id}/parents`;
    const result = await this.http.get(url, { headers: request.headers });
    return result.data;
  }
}
