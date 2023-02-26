const express = require("express");
const { testQuery } = require("../controllers/testController");
const router = express.Router();

// router.get("/", (req, res) => {
// 	res.status(200).json({ status: "Successfull" });
// });
router.get("/test", testQuery); //http://localhost:8080/api/v1/test

module.exports = router;
