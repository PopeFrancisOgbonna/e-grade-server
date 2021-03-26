const express = require('express');
const router = express.Router();
const client = require('./db');
const questions = require('./services/questionsHandler');
const register = require('./services/registrationhandle');
const login = require('./services/loginHandle');
const result = require('./services/result');

router.get('/', (req, res) =>{
  res.send('app working fine...');
});


//Begining of Registration handle for both staff and students
const registerStaff = (req, res) => {register.staff(req, res, client)};
const registerStudent = (req, res) =>{register.student(req, res, client)};

//Login Authentication handle
const loginHandler = (req, res) => {login.student(req, res, client)};
const staffLoginHandle = (req, res) => {login.staff(req, res, client)};

//Student module services
const uploadResult = (req, res) => {result.upload(req, res, client)};
const getStudentResults = (req, res) => {result.studentResult(req, res, client)};
const getIndividualResult = (req, res) => {result.specificResult(req, res, client)};
const updateResult = (req, res) => {result.updateSingleResult(req, res, client)};
const resultCheck = (req, res) => {result.allResult(req, res, client)};

//Question uploading and handling services
const getQuestion = (req, res) => {questions.getQuestions(req, res, client)};
const loadQuestion = (req, res) => {questions.uploadQuestions(req, res, client)};
const getCourse = (req, res) => {questions.getCourseCodes(req, res, client)};


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
  updateResult,
  getQuestion,
  loadQuestion,
  getCourse,
};