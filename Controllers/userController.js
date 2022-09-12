
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'creditt'
  });

exports.loginUser = (req,res) => {
  const email = req.body.Email;

  con.query(`SELECT * from users Where Email = "${email}"`,function(error,rows,fields){
    if(error){
        console.log(error);
    }
    const results = Object.values(JSON.parse(JSON.stringify(rows)));
    
    if(results.length > 0){
    results.forEach(user => {
      const token = user.Password;
        jwt.verify(token, 'joanlouji', (err, decodedData) => {
        if (!err) {
          let password = decodedData.sub;
          if(password == req.body.Password){
            res.send(user);
          }else{
            res.send("Please Provide Correct Username or Password!!");
          }
        } else {
          console.log(err);
          res.send(
            "Please Provide Correct Username or Password!!"
          );
        }
    });
  })
}else{
  res.send(
    "Please Provide Correct Username or Password!!"
  );
}
})
}

genToken = user => {
  return jwt.sign({
    iss: 'Neha_Babariya',
    sub: user,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  },  process.env.SECRET);
}

exports.addData = (req,res) => {
var password = genToken(req.body.Password);
        con.query(`INSERT INTO users (Name, Age, Gender,Email, Password, City, State, Hobbies, Photo) VALUES 
            ("${req.body.Name}","${req.body.Age}","${req.body.Gender}","${req.body.Email}","${password}","${req.body.City}"
            ,"${req.body.State}","${req.body.Hobbies}","${req.file.path}");`, function (error, results, fields) {
        if (error) throw error;
        console.log("data added into table")
      })
      
    res.send(req.file);
}

exports.updateUser = (req,res) => { 
   var id =  req.query.id;
   
   console.log(req.body)
   con.query(`UPDATE users SET Name="${req.body.Name}",Email="${req.body.Email}",
   City="${req.body.City}",State="${req.body.State}",
   Hobbies="${req.body.Hobbies}",Gender="${req.body.Gender}"
    Where _id = "${id}"`,function(error,rows,fields){
    if(error){
        console.log(error);
    }else{
      res.send("Data Updated Successfully!!")
    }
  })
}

exports.getAllUser = (req,res) => {
  con.query(`SELECT * from users`,function(error,rows,fields){
    if(error){
        console.log(error);
    }
    const results = Object.values(JSON.parse(JSON.stringify(rows)));
    
    if(results.length > 0){
      res.send(results)
    }
  })
 }