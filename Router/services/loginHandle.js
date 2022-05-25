const student = (req, res, client) => {
  const {userName, password} = req.body;
  let query = `select full_name, reg_no from students where lower(reg_no) = '${userName.toLowerCase()}' and lower(password) = '${password.toLowerCase()}'`;
  client.query(query, (err, result) =>{
    console.log(query);
    if(err) throw err;
    console.log(query);
    console.log(result.rows);
    res.send(result.rows);
  })
}
  
const staff = (req, res, client) => {
  const {username, password} = req.body;
  let query = 'select full_name, email from staff where lower(email) = $1 and lower(password) = $2';
  client.query(query,[username.toLowerCase(), password.toLowerCase()], (err, result) =>{
    if(err) throw err;
    console.log(result.rows);
    res.send(result.rows);
  })
}

module.exports = {
  student, 
  staff
}