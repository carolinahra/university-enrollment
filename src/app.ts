import express from "express";
import { StudentController } from "./controllers/student.controller";

const app = express();
const port = 3000;

const studentController = new StudentController();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/students', (req, res) => {
    console.log(req.query);

    res.send(studentController.getAll());
});


//app.post()
//app.put()
//app.delete()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
