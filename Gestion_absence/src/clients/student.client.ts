import { Request } from "express";
import {
  ClassLevelDto,
  ParentDto,
  PaginatedResultDto,
  StudentDto,
} from "../types/dto.js";

export interface StudentClient {
  findAllUsers(
    filter: {
      class_level?: number;
      name?: string;
    },
    request: Request,
  ): Promise<StudentDto[]>;

  findAllUsersPaginated(
    filter: {
      class_level?: number;
      name?: string;
      page?: number;
      limit?: number;
    },
    request: Request,
  ): Promise<PaginatedResultDto<StudentDto>>;

  findById(id: number, request: Request): Promise<StudentDto>;

  findAllClassLevels(request: Request): Promise<ClassLevelDto[]>;

  findParents(id: number, request: Request): Promise<ParentDto[]>;
}
