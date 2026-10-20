import { fakerFR as faker } from "@faker-js/faker";
import sequelize from "./database.js";
import { ClassLevel } from "../models/class_level.model.js";
import { Student } from "../models/student.model.js";
import { Parent } from "../models/parent.model.js";
import { StudentParent } from "../models/student_parent.model.js";

const CLASS_LEVELS = ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Tle"];
const STUDENTS_PER_CLASS = 20;

export async function initDB() {
  await sequelize.authenticate();
  console.log("Connexion PostgreSQL OK");

  await sequelize.sync({ alter: true });
}

export async function insertInitialData() {
  await insertClassLevels();
  await insertStudentsWithParents();
}

async function insertClassLevels() {
  for (const name of CLASS_LEVELS) {
    const existing = await ClassLevel.findOne({ where: { name } });
    if (!existing) {
      await ClassLevel.create({ name });
    }
  }
}

async function insertStudentsWithParents() {
  const studentCount = await Student.count();
  if (studentCount > 0) return;

  const classLevels = await ClassLevel.findAll();

  for (const classLevel of classLevels) {
    for (let i = 0; i < STUDENTS_PER_CLASS; i++) {
      const studentFirstName = faker.person.firstName();
      const studentLastName = faker.person.lastName();

      const student = await Student.create({
        name: studentFirstName,
        surname: studentLastName,
        classLevelId: classLevel.get("id") as number,
        address: faker.location.streetAddress({ useFullAddress: true }),
      });

      const parentFirstName = faker.person.firstName();
      const parentLastName = studentLastName;

      const parent = await Parent.create({
        name: parentFirstName,
        surname: parentLastName,
        email: faker.internet.email({
          firstName: parentFirstName,
          lastName: parentLastName,
        }),
        phone: faker.phone.number({ style: "national" }),
      });

      await StudentParent.create({
        studentId: student.get("id") as number,
        parentId: parent.get("id") as number,
      });
    }
  }
}
