export interface ClassLevelAttributes {
  id?: number;
  name?: string;
  students?: StudentAttributes[];
}

export interface StudentAttributes {
  id?: number;
  name?: string;
  surname?: string;
  classLevelId?: number;
  address?: string;
  classLevel?: ClassLevelAttributes;
  parents?: ParentAttributes[];
}

export interface ParentAttributes {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  students?: StudentAttributes[];
}

export interface StudentParentAttributes {
  id?: number;
  studentId?: number;
  parentId?: number;
}
