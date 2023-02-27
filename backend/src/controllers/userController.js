const Users = require("../models/Users");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ENV = require('../../config.env')


//middleware for verify user
exports.verifyUser=async(req, res, next)=>{
    try {
        const {email}=req.method =="GET" ? req.query : req.body;
//check the user existence
        let exist = await Users.findOne({email});
        if(!exist) return res.status(404).send({error: "can't find user!"});
        next();
    } catch (error) {
        return res.status(404).send({error:"Authentication error"});
        
    }
}

//signUp function create
exports.signup = (req, res) => {
	const { full_name, phone,profile_pic,email, password } = req.body;
	
	try {
	  // check existing user name
	  const existUserName = new Promise((resolve, reject) => {
		Users.findOne({ full_name }, (error, data) => {
		  if (error) reject(error);
		  if (data) reject({ data: "please Enter your unique Name" });
		  resolve();
		});
	  });
	  // check existing user Mail
	  const existUserMail = new Promise((resolve, reject) => {
		Users.findOne({ email }, (error, data) => {
		  if (error) reject(error);
		  if (data) reject({ data: "please Enter your unique Email" });
		  resolve();
		});
	  });
  
	  Promise.all([existUserName, existUserMail])
		.then(() => {
		  if (password) {
			bcrypt
			  .hash(password, 5)
			  .then((hashPassword) => {
				const user = Users({
				  full_name,
				  password: hashPassword,
				  profile_pic:profile_pic || '',
				  phone,
				  email,
				});
  
				user
				  .save()
				  .then((result) =>res.status(201).send({msg: "User Register Successfully ",status: result}))
				  .catch((error) => res.status(500).send({ error }));
			  })
			  .catch((error) => {
				console.error(error);
				return res
				  .status(500)
				  .send({ error: "unable to hash password" });
			  });
		  }
		})
		.catch((error) => {
		  console.error(error);
		  return res.status(500).send({ error });
		});
	} catch (error) {
	  console.error(error);
	  return res.status(500).send(error);
	}
  };
  
//login function controller
  exports.login = (req, res) => {
	const { email, password } = req.body;
	try {
	  Users.findOne({ email }).then((user) => {
		bcrypt
		  .compare(password, user.password)
		  .then((passwordCheck) => {
			if (!passwordCheck) {
			  return res.status(400).json({ error: "Invalid password" });
			}
			// jwt token
			const token = jwt.sign(
			  { userId: user._id, email: user.email },
			  process.env.JWT_SECRET,
			  { expiresIn: "6h" }
			);
			return res.status(200).send({
			  msg: "Login successful!",
			  email: user.email,
			  token,
			});
		  })
		  .catch((error) => {
			console.error(error);
			return res.status(400).send({ error: "Password does not match" });
		  });
	  }).catch((error) => {
		console.error(error);
		return res.status(404).send({ error: "User not found" });
	  });
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({ error });
	}
  };
  
//update function controller
exports.update = (req, res) => {
const id= req.params.id;
const Query={_id:id}
const reqBody=req.body;
Users.updateOne(Query,reqBody, (error, data)=>{
	if(error){
		res.status(400).json({massage:'Update failed', error:error})
	}else{
		res.status(200).json({massage:"product update Successfully ", status:data})
	}	
})
};
exports.logout = (req, res) => {
	res.status(200).json({ location: "User Logout" });
};
