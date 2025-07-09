import express from "express";
import { DatabaseService } from "./services/database.service.js";
import { StudentFactory } from "./factories/student.factory.js";
import { StudentService } from "./services/student.service.js"
import { StudentController } from "./controllers/student.controller.js";
import { ExceptionService } from "./services/exception.service.js";
import { GetStudentRequest } from "./requests/student/get-student.request.dto.js";
import { InsertStudentRequest } from "./requests/student/insert-student.request.dto.js";
import { UpdateStudentRequest } from "./requests/student/update-student.request.dto.js";
import { DeleteStudentRequest } from "./requests/student/delete-student.request.dto.js";

const app = express();
const port = 3000;

app.use(express.json()); // Explicar proximo dia

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    res.on('close', () => { // Event -> explicar proximo dia
        console.log('after');
    });
    next();
});

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

// student
app.get('/students', (req, res) => {
    console.log(req.query); // QUERY PARAMETERS
    const request = new GetStudentRequest(req.query.name as string, req.query.email as string, req.query.limit as unknown as number, req.query.offset as unknown as number);

    studentController.get(request).then((students) => res.send(students));
});

// ROUTE PARAMETERS
app.get('/students/:name', (req, res) => {
    console.log(req.params);
    const request = new GetStudentRequest(req.params.name);
    studentController.get(request).then((students) => res.send(students));
});
app.get('/students/email/:email', (req, res) => {
    console.log(req.params);
    const request = new GetStudentRequest(req.params.email);
    studentController.get(request).then((students) => res.send(students));
});

app.post('/students', (req, res) => {
    const request = new InsertStudentRequest(req.body.name, req.body.email);
    studentController.insert(request).then((students) => res.send(students));
});

app.put('/students', (req, res) => {
    const request = new UpdateStudentRequest(req.body.email, req.body.name, req.body.newEmail);
    studentController.update(request).then((students) => res.send(students));
});

app.delete('/students', (req, res) => {
    const request = new DeleteStudentRequest(req.body.email as string);
    studentController.delete(request).then((response) => res.send(response));
});
//app.put()
//app.delete()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// professor