const registerCourse = (req,res, client) => {
  const { code,level,name,regno,semester,title} = req.body;
 
  let query = 'insert into courses (title, code,semester, level, students,reg_no) values($1,$2,$3,$4,$5,$6)';
  let checkQuery = "select * from courses where reg_no =$1 and code =$2";
  client.query(checkQuery,[regno,code],(err,result) =>{
    if(err) {
      res.status(400).send("Error: Unexpected error while processing request.");
      console.log(err);
      return;
    };
    if(result.rows[0]){
      res.send("You've registered already.");
      return;
    }else{
      client.query(query,[title,code,semester,level,name,regno], (err, result) =>{
        if(err) {
          res.status(400).send("Error: Unexpected error while processing request.");
          console.log(err);
          return;
        };
        console.log(result.rowCount); 
        res.status(200).send('Registration was Successfully.');
      })
    }
  })
  
}

const confirmRegistration = (req, res, client) => {
  const {code} = req.params;
  const {regno} = req.query;
  let checkQuery = `select * from courses where Lower(code) ='${code.toLowerCase()}' and Lower(reg_no) ='${regno}'`;
  // select * from courses where Lower(code)='iph 101' and reg_no='esut/2014/155200'
  client.query(checkQuery,(err,result) =>{
    if(err) throw err;
    res.send(result.rows)
  })
}

module.exports ={
  confirmRegistration,
  registerCourse,
}