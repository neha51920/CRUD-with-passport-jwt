const express = require("express");
const app = express();
const userRoute = require('./Routes/userRoute');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json()); 

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   :  process.env.SECRET
  },
   function (jwtPayload, done) {
    con.query(`SELECT * from users Where Email = "${jwtPayload.sub.Email}"`,function(error,rows,fields){
        if(error){
            console.log(error);
        }
        return done(null, rows);
    })
  }
));

app.get('/secret', passport.authenticate('jwt',{session: false}),(req,res,next)=>{
    res.send(req.user);
});

app.get('/login',(req,res,next)=>{
    // const isMatch = bcrypt.compare(req.body.password, )
    const token = jwt.sign('Neha@123', 'joanlouji');
    console.log(token);
  })

  genToken = user => {
    return jwt.sign({
      iss: 'Neha_Babariya',
      sub: user,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET);
  }

app.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/api',userRoute);
module.exports = app;