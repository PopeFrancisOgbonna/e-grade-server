const staff = (req, res, client) =>{
  const {fullName,email,password} = req.body;
  let query = 'insert into staff(full_name, email, password) values($1, $2, $3)';
  
  client.query(query,[fullName, email, password], (err, result) =>{
    if(err){ 
      res.status(422).send("Error: Email already exist.");
      console.log(err);
     return;
    }
    console.log(result);
    res.status(200).send('Registered Successfully!');
  })
}
  
const student = (req, res, client) =>{
  const {fullName,regNo,password} = req.body;
  let query = 'insert into students(full_name, reg_no, password) values($1, $2, $3)';
  client.query(query,[fullName, regNo, password], (err, result) =>{
    if(err){ 
      res.status(422).send("Error: Email already exist.");
      console.log(err);
      return;
    }
    console.log(result);
    res.status(200).send('Registered Successfully!');
  })
}
module.exports = {
  staff,
  student
}
