import { Student } from "../models/student.js";
import { GetStudentRequest } from "../requests/student/get-student.request.dto.js";
import { StudentService } from "../services/student.service.js";
import { ErrorResponse, ExceptionService } from "../services/exception.service.js";
import { InsertStudentRequest } from "../requests/student/insert-student.request.dto.js";
import { UpdateStudentRequest } from "../requests/student/update-student.request.dto.js";
import e from "express";
import { DeleteStudentRequest } from "../requests/student/delete-student.request.dto.js";

export class StudentController {
    private studentService: StudentService;
    private exceptionService: ExceptionService;
    constructor(studentService: StudentService, exceptionService: ExceptionService) {
        this.studentService = studentService;
        this.exceptionService = exceptionService;
    }

    public get(request: GetStudentRequest): Promise<Student[] | ErrorResponse> {
        if (request.email) {
            return this.getStudentByEmail(request.email);
        }
        if (request.name) {
            return this.getStudentsByName(request.name);
        }

        return this.getStudents(request.limit, request.offset);
    }

    private getStudents(limit: number, offset: number) {
        return this.studentService.get(limit, offset);
    }

    private getAll() {
        return this.studentService.getAll();
    }

    private getStudentsByName(name: string) {
        return this.studentService.getByName(name).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    private getStudentByEmail(email: string) {
        return this.studentService.getByEmail(email).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }

    public insert(request: InsertStudentRequest): Promise<Student[] | ErrorResponse> {
        return this.studentService.insert(request.name, request.email).catch((error) => {
            return this.exceptionService.handle(error);
        });
    }


    public update(request: UpdateStudentRequest): Promise<Student[] | ErrorResponse> {
        if (request.name) {
            return this.studentService.updateName(request.name, request.email).catch((error) => {
                return this.exceptionService.handle(error);
            });
        }
        return this.studentService.updateEmail(request.newEmail, request.email).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }


    public delete(request: DeleteStudentRequest): Promise<string | ErrorResponse> {
        return this.studentService.delete(request.email).catch((error) => {
            return this.exceptionService.handle(error);
        })
    }

}
// Conectarte a base de datos y devolver todos los estudiantes/cursos/grados/prerequisitos...
// Por ahora nada de POST, PUT, DELETE o exception services