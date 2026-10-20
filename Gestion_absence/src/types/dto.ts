export class StudentDto {
  id?: number;
  name?: string;
  surname?: string;
  classLevelId?: number;
  address?: number;
  parents?: ParentDto[];
}

export class ParentDto {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
}

export class createAbsenceDto {
  absenceDate?: Date;
  studentId!: number;
  studentName!: string;
  studentSurname!: string;
  studentClass!: string;
  reasonStdId?: number;
  reasonDetail?: string;
}

export class createAbsenceReturnDto {
  returnDate?: Date;
  reasonStdId?: number;
  reasonDetail?: string;
}

export interface ClassLevelDto {
  id?: number;
  name?: string;
}

export interface PaginatedResultDto<T> {
  members: T[];
  totalItems: number;
}
