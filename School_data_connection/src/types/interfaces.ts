export interface ClassLevel {
  id?: number;
  name?: string;
}

export interface Student {
  id: number;
  name: string;
  surname: string;
  parents: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
  }[];
}

export interface StudentParent {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
}

export interface PaginationResultDto<T> {
  members: T[];
  totalItems: number;
}
