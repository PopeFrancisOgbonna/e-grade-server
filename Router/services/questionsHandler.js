const getQuestions = (req, res, client) => {
  let query = 'select * from exams';
  client.query(query, (err, result) => {
    if(err) throw err;
    res.status(200).send(result.rows);
  })
}

const uploadQuestions = (req, res, client) => {
  const {course, code, quest, ans, keys } = req.body;
  let query ='insert into exams (course_title, course_code, question, ans, keyword) values( $1, $2, $3, $4, $5)';
  client.query(query, [course, code, quest, ans, keys], (err, result) => {
    if(err) throw err;
    console.log(result.rowCount); 
    res.status(200).send('Uploaded Successfully.');
  })
}

const getCourseCodes = (req, res, client) => {
  let query = 'select distinct course_code from exams';
  client.query(query, (err, result) => {
    if(err) throw err;
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}

const getExamQuestions = (req, res, client) => {
  const {code} = req.params;
  let query = 'select * from exams where Lower(course_code) = $1';
  client.query(query,[code.toLowerCase()], (err, result) => {
    if(err) throw err;
    res.status(200).send(result.rows);
  })
}

module.exports= {
  uploadQuestions,
  getQuestions,
  getCourseCodes,
  getExamQuestions,
}