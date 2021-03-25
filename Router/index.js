const express = require('express');
const { query } = require('./db');
const router = express.Router();
const client = require('./db');

router.get('/', (req, res) =>{
  res.send('app working fine...');
});

//Begining of Registration handle for both staff and students
const registerStaff = (req, res) =>{
  const {fullName,email,password} = req.body;
  let query = 'insert into staff(full_name, email, password) values($1, $2, $3)';
  client.query(query,[fullName, email, password], (err, result) =>{
    if(err){ throw err;}
    console.log(result);
    res.status(200).send('Registered!');
  })
}

const registerStudent = (req, res) =>{
  const {fullName,regNo,password} = req.body;
  let query = 'insert into students(full_name, reg_no, password) values($1, $2, $3)';
  client.query(query,[fullName, regNo, password], (err, result) =>{
    if(err){ throw err;}
    console.log(result);
    res.status(200).send('Registered!');
  })
}

//Login Authentication handle
const loginHandler = (req, res)=>{
  const {userName, password} = req.body;
  let query = 'select full_name, reg_no from students where reg_no = $1 and password = $2';
  client.query(query,[userName, password], (err, result) =>{
    if(err) throw err;
    console.log(result.rows);
    res.send(result.rows);
  })
}

const staffLoginHandle = (req, res)=>{
  const {userName, password} = req.body;
  let query = 'select full_name, email from staff where email = $1 and password = $2';
  client.query(query,[userName, password], (err, result) =>{
    if(err) throw err;
    console.log(result.rows);
    res.send(result.rows);
  })
}

//Student module services
const uploadResult = (req, res) => {
  const {name, regNo, course, code, score} = req.body;
  let query = 'insert into result (name, course_title, course_code, score, reg_no) values($1, $2, $3, $4, $5)';
  client.query(query, [name, course, code, score, regNo], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.status(200).send('Record Saved!');
  })

}
const getStudentResults = (req, res) => {
  const {regNo } = req.params;
  let query = 'select * from result where reg_no = $1';
  client.query(query, [regNo], (err, result) => {
    if(err) throw err;
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}
const getIndividualResult = (req, res) => {
  const {regNo, code} = req.params;
  let query = 'select * from result where reg_no = $2 and course_code = $2';
  client.query(query, [regNo, code], (err, result) => {
    if(err) throw err;
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}
const updateResult = (req, res) => {
  const {regNo, code, score} = req.body;
  let query = 'update result set score = $1 where reg_no = $2 and course_code = $3';
  client.query(query, [score, regNo, code], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.status(200).send(result);
  })
}
const resultCheck = (req, res) => {
  let query = 'select * from result';
  client.query(query, (err, result) => {
    if(err) throw err;
    console.log(result.rows)
    res.status(200).send(result.rows);
  })
}


module.exports = {
  router,
  registerStaff,
  registerStudent,
  staffLoginHandle,
  loginHandler,
  uploadResult,
  resultCheck,
  getIndividualResult,
  getStudentResults,
  updateResult
};