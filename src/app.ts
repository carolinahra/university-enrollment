import express from "express";
import { DatabaseService } from "./services/DatabaseService"
import { StudentFactory } from "./factories/StudentFactory";
import { StudentService } from "./services/StudentService"
import { StudentController } from "./controllers/student.controller";
import { ExceptionService } from "./services/exception.service";
import { GetStudentRequest } from "./requests/student/get-student.request.dto";

const app = express();
const port = 3000;

const dataBaseService = new DatabaseService({
    database: "university_enrollment_system",
    user: "carolina",
    password: "",
    host: "localhost"
});
dataBaseService.connect();
const exceptionService = new ExceptionService();
const studentFactory = new StudentFactory(dataBaseService);
const studentService = new StudentService(studentFactory);
const studentController = new StudentController(studentService, exceptionService);


app.get('/', (req, res) => {
    res.send('Hello World!')
});

// PATH
// after ? = query parameters
app.get('/students', (req, res) => {
    console.log(req.query); // QUERY PARAMETERS
    const request = new GetStudentRequest(req.query.name as string, req.query.email as string);

    studentController.get(request).then((students) => res.send(students));
});

// ROUTE PARAMETERS
app.get('/students/:id/course/:courseId', (req, res) => {
    console.log(req.params);
});

// Explicar que en javaSCRIPT TODO SON SCRIPTS
//app.post()
//app.put()
//app.delete()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});