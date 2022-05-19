require('dotenv').config();
const express = require('express');
const router = require('./Router');
const cors = require('cors');
const client = require('./Router/db');
const morgan = require('morgan');
const PORT = process.env.PORT || 3020;



const app = express()

// app.use(router);
app.use(cors({origin:true}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


client.connect();
client.on("connect", (err, res) =>{
    if(err) return console.log(err);
    console.log('connected sucessfully!');
})

app.get("/", router.getRoute);
app.post('/student/register', router.registerStudent);
app.post("/staff/register", router.registerStaff)
app.post('/student/login', router.loginHandler);
app.post('/staff/login', router.staffLoginHandle);

app.post('/result/upload', router.uploadResult);
app.put('/result/update', router.updateResult);

app.get('/results', router.results);
app.get('/results/student', router.getStudentResults);
app.get('/result/:code', router.getIndividualResult);
app.get('/results/:code', router.courseResults);

app.post('/question', router.loadQuestion);
app.get('/question', router.getQuestion);
app.get('/questions/:code', router.getExamQuestions);

app.get('/courses', router.getCourse); // endpoint gets all available courses and registered Students
app.get('/courses/student/:code',router.confirmRegistration);
app.post('/courses/register',router.registerCourse);


app.listen(PORT, () => console.log(`Server started at ${PORT}`));
