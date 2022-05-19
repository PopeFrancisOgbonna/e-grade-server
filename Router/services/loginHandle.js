const student = (req, res, client) => {
  const {userName, password} = req.body;
  let query = `select full_name, reg_no from students where reg_no = ${userName} and password = ${password}}`;
  client.query(query, (err, result) =>{
    if(err) throw err;
    console.log(query);
    console.log(result.rows);
    res.send(result.rows);
  })
}
  
const staff = (req, res, client) => {
  const {username, password} = req.body;
  let query = 'select full_name, email from staff where email = $1 and password = $2';
  client.query(query,[username, password], (err, result) =>{
    if(err) throw err;
    console.log(result.rows);
    res.send(result.rows);
  })
}

module.exports = {
  student, 
  staff
}