const upload = (req, res, client) => {
  const {name, regNo, course, code, score} = req.body;
  let query = 'insert into result (name, course_title, course_code, score, reg_no) values($1, $2, $3, $4, $5)';
  client.query(query, [name, course, code, score, regNo], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.status(200).send('Record Saved!');
  })

}
const studentResult = (req, res, client) => {
  const {regNo } = req.params;
  let query = 'select * from result where reg_no = $1';
  client.query(query, [regNo], (err, result) => {
    if(err) throw err;
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}
const specificResult = (req, res, client) => {
  const {regNo, code} = req.params;
  let query = 'select * from result where reg_no = $2 and course_code = $2';
  client.query(query, [regNo, code], (err, result) => {
    if(err) throw err;
    console.log(result.rows);
    res.status(200).send(result.rows);
  })
}
const updateSingleResult = (req, res, client) => {
  const {regNo, code, score} = req.body;
  let query = 'update result set score = $1 where reg_no = $2 and course_code = $3';
  client.query(query, [score, regNo, code], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.status(200).send(result);
  })
}
const allResult = (req, res, client) => {
  let query = 'select * from result';
  client.query(query, (err, result) => {
    if(err) throw err;
    console.log(result.rows)
    res.status(200).send(result.rows);
  })
}
module.exports = {
  upload,
  studentResult,
  specificResult,
  updateSingleResult,
  allResult,
}