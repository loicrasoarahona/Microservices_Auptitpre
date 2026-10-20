import { ClassLevel } from "./class_level.model.js";
import { Student } from "./student.model.js";
import { Parent } from "./parent.model.js";
import { StudentParent } from "./student_parent.model.js";

export function setupRelations() {
  ClassLevelToStudentRelation();
  StudentToParentRelation();
}

function ClassLevelToStudentRelation() {
  ClassLevel.hasMany(Student, { foreignKey: "classLevelId", as: "students" });
  Student.belongsTo(ClassLevel, {
    foreignKey: "classLevelId",
    as: "classLevel",
  });
}

function StudentToParentRelation() {
  Student.belongsToMany(Parent, {
    through: StudentParent,
    foreignKey: "studentId",
    otherKey: "parentId",
    as: "parents",
  });
  Parent.belongsToMany(Student, {
    through: StudentParent,
    foreignKey: "parentId",
    otherKey: "studentId",
    as: "students",
  });
}
