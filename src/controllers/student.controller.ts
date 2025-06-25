import { Student } from "../models/Student";
import { GetStudentRequest } from "../requests/student/get-student.request.dto";
import { StudentService } from "../services/StudentService";
import { ErrorResponse, ExceptionService } from "../services/exception.service";

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

        return this.getAll();
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

    public insert(/* INSERTDTO*/) {

    }


    public update(/* UPDATEDTO */) {
        
    }


    public delete(/* DELETEDTO*/ ) {
        
    }

}
// Conectarte a base de datos y devolver todos los estudiantes/cursos/grados/prerequisitos...
// Por ahora nada de POST, PUT, DELETE o exception services