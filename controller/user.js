const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();

function isStringInvalid(string) {
  return string === undefined || string.length === 0;
}

const signupPage = async (req, res) => {
  //console.log("SignupPage")
  res.sendFile('signup.html', { root: 'public/views' });
};
const loginPage = async (req, res) => {
  //console.log("loginPage")
  res.sendFile('login.html', { root: 'public/views' });
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //console.log({ name, email, password })
    if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)) {
      return res.status(400).json({ err: "Bad parameters. Something is missing" });
    }
    const saltrounds = 10;
    const hash = await bcrypt.hash(password, saltrounds);
      //console.log(err)
      // await User.create({ name, email, password: hash })
      const user = new User({name, email, password: hash})
      await user.save()
      return res.status(200).json({ message: "Signup successful" })
    
  }catch(err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
 
const login = async (req,res)=>{
  try{
  const { email,password } = req.body;
  if(isStringInvalid(email) || isStringInvalid(password)){
    return res.status(400).json({success: false, message: `Email and password is missing`})
  }
  const user = await User.findOne({email})
    if(user){
      bcrypt.compare(password,user.password, (err,response)=>{
        if(err){
         throw new Error(`Something went wrong`)
        }
        if(response){
          res.status(200).json({
            success: true,
             message:`User Logged in succesfully`, 
             token: generateAccessToken(user._id, user.name,user.ispremiumuser)})
        }else{
          return res.status(400).json({success: false, message: `Password is incorrect`})
        }
      }) 
    }else{
      return res.status(400).json({success: false, message: `User not found`})
    }
  }catch(err){
    res.status(400).json({message: err, success: false})
  }
}

function generateAccessToken(_id,name,ispremiumuser){ 
  return jwt.sign({userId: _id , name:name, ispremiumuser },process.env.TOKEN_SECRET)
}

module.exports = {
  signupPage,
  signup,
  loginPage,
  login,
  generateAccessToken
};
