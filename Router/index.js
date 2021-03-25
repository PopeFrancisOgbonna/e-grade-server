const express = require('express');
const router = express.Router();
const client = require('./db');

router.get('/', (req, res) =>{
  res.send('app working fine...');
});


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


module.exports = {
  router,
  registerStaff,
  registerStudent,
  staffLoginHandle,
  loginHandler};