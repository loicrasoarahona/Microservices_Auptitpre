import { Request } from "express";
import {
  ClassLevel,
  PaginationResultDto,
  Student,
  StudentParent,
} from "../types/interfaces.js";

export interface StudentClient {
  getAll(filter?: any, request?: Request): Promise<Student[]>;
  getById(id: number, request?: Request): Promise<Student | null>;
  getAllPaginated(
    filter?: any,
    page?: number,
    request?: Request,
  ): Promise<PaginationResultDto<Student>>;
  getParents(id: number, request?: Request): Promise<StudentParent[]>;
  getClassLevels(request?: Request): Promise<ClassLevel[]>;

  getStudentGrades(
    id: number,
    classLevel: string,
    request?: Request,
  ): Promise<void>;
}
