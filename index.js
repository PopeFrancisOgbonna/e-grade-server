require('dotenv').config();
const express = require('express');
const router = require('./Router');
const cors = require('cors');
const client = require('./Router/db');
const PORT = process.env.PORT || 3020;



const app = express()

// app.use(router);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


client.connect();
client.on("connect", (err, res) =>{
    if(err) return console.log(err);
    console.log('connected sucessfully!');
})

app.post('/student/register', router.registerStudent);
app.post("/staff/register", router.registerStaff)
app.post('/student',router.loginHandler);
app.post('/staff', router.staffLoginHandle);
app.post('/result/upload', router.uploadResult);
app.put('/result/update', router.updateResult);
app.get('/result', router.resultCheck);
app.get('/result/:regNo', router.getStudentResults);
app.get('/result/:regNo/:code', router.getIndividualResult);


app.listen(PORT, () => console.log(`Server started at ${PORT}`));
