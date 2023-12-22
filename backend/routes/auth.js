const express = require("express");
const router = express.Router();
var User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "ankitisaG00db0y"
const fetchuser = require('../middleware/fetchuser')
let success = false;
// User.insertOne()
// Route:1 Create a User using: Post "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter valid Name").isLength({ min: 5 }),
    body("email", "enter valid Email").isEmail(),
    body("password", "enter  Password etlist 5 charactors").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    try {
        // check whether the user wuth this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exist" });
      }

      //genrate password with slat 
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt)

      // create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

        //genrate auth token
        const data = {
          user:{
              id: user.id
          }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success,authToken});
      //res.json(user);

        //   .then(user => res.json(user))
        //   .catch((err)=>{console.log(err)
        //   res.json({error: "Please enter uniq values" , message: err.message})});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
    
  }
);
//Route:2 Authenticate a User using: Post "/api/auth/login". No login required
router.post("/login",[
    body("email", "enter valid Email").isEmail(),
    body("password", "Password connot be blank").exists(),
  ],
  async (req, res) => {
     // if there are errors, return bad request and the errors
     success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // login email or password match
    const {password,email} =  req.body;
   
    try {
      const user =  await User.findOne({email});
      if(!user){
        return res.status(400).json({success, error: "Please try to login with correct credentials email"})
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({success, error: "Please try to login with correct credentials password"})
      }
      //genrate auth token
      const data = {
        user:{
            id: user.id
        }
      }
      const authToken =  jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error Authenticate");
    }
  }
);
//Route:3 Get loggedin User details using: Post "/api/auth/getuser". login required
router.post('/getuser',fetchuser,
async (req, res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error loggedin User");
  }
}
)

module.exports = router;
