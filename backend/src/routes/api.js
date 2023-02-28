const express = require("express");
const { testQuery } = require("../controllers/testController");
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const subcategoryController = require("../controllers/categoryController");
const taskController = require("../controllers/tasksController");
const decoder = require("../middleware/decoder");
const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({ status: "Successfull" });
});
router.get("/test", testQuery); //http://localhost:8080/api/v1/test

//User Routes
router.post("/user/signup", userController.signup);
router.post("/user/login", userController.verifyUser, userController.login);
router.patch("/user/update/:id", userController.update);
router.get("/user/logout", userController.logout);

//Category Routes
router.post("/category/create", decoder, categoryController.create);
router.patch("/category/update/:id", categoryController.update);
router.get("/category/list", categoryController.list);
router.delete("/category/delete/:id", categoryController.delete);

//Sub Category Routes
router.post("/subcategory/create", subcategoryController.create);
router.patch("/subcategory/update/:id", subcategoryController.update);
router.get("/subcategory/search-by-category", subcategoryController.list);
router.delete("/subcategory/delete/:id", subcategoryController.delete);

//Tasks Routes
router.post("/tasks/create", taskController.create);
router.patch("/tasks/update/:id", taskController.update);
router.get("/tasks/list", taskController.list);
router.delete("/tasks/delete/:id", taskController.delete);
router.delete("/tasks/delete-all", taskController.deleteAll);
module.exports = router;
