import { Student } from "../models/Student"
export class StudentController {
    getAll() {
        const students: Student[] = [{ name: "Ana", email: "ana@email.com" }];
        return students;
    }
}
// Conectarte a base de datos y devolver todos los estudiantes/cursos/grados/prerequisitos...
// Por ahora nada de POST, PUT, DELETE o exception services