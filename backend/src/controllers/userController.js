const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("../../config.env");

//middleware for verify user
exports.verifyUser = async (req, res, next) => {
	try {
		const { email } = req.method == "GET" ? req.query : req.body;

		await validateEmail(email);

		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}

		next();
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: "Authentication error" });
	}
};

const validateEmail = (email) => {
	return new Promise((resolve, reject) => {
		if (!email) {
			return reject({ error: "Email is required" });
		}

		// Use a regular expression to validate the email address
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return reject({ error: "Invalid email address" });
		}

		resolve();
	});
};

//signUp function create
exports.signup = async (req, res) => {
	const { username, phone, profile_pic, email, password } = req.body;

	try {
		await checkExistingUser(username, "username");
		await checkExistingUser(email, "email");

		const hashPassword = await bcrypt.hash(password, 5);

		const user = new Users({
			username,
			password: hashPassword,
			profile_pic: profile_pic || "",
			phone,
			email,
		});

		const result = await user.save();

		return res.status(201).send({
			msg: "User Registered Successfully ",
			status: result,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error });
	}
};

const checkExistingUser = (value, field) => {
	return new Promise((resolve, reject) => {
		const query = {};
		query[field] = value;

		Users.findOne(query, (error, data) => {
			if (error) return reject(error);

			if (data) {
				const errorMessage = `Please enter a unique ${field}`;
				return reject({ data: errorMessage });
			}

			return resolve();
		});
	});
};

//login function controller
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).send({ error: "User not found" });
		}

		// Compare password
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).send({ error: "Invalid credentials" });
		}

		// Generate token
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "6d" }
		);

		return res.status(200).send({
			msg: "Login successful!",
			email: user.email,
			token,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: "Internal server error" });
	}
};

//update function controller
exports.update = (req, res) => {
	const id = req.params.id;
	const Query = { _id: id };
	const reqBody = req.body;
	Users.updateOne(Query, reqBody, (error, data) => {
		if (error) {
			res.status(400).json({ massage: "Update failed", error: error });
		} else {
			res.status(200).json({
				massage: "product update Successfully ",
				status: data,
			});
		}
	});
};
exports.logout = (req, res) => {
	res.status(200).json({ location: "User Logout" });
};
