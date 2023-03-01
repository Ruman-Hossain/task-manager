const { query } = require("express");
const SubCategories = require("../models/SubCategories");

// !SubCategories Create
exports.create = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const categoryId = req.params.category_id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Sub Category Name is required" });
    }

    const existingSubCategory = await SubCategories.findOne({ name });

    if (existingSubCategory) {
      return res.status(400).json({ error: "Sub Category already exists" });
    }

    const subCategory = await SubCategories.create({
      category_id:categoryId,
      name:name,
      user_id: userId,
    });

    res.status(200).json({ status: "Success", data: subCategory });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// !Sub Category Update

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const { name } = req.body;
    const reqBody = req.body;
    const existingCategory = await SubCategories.findOne({ name });

    if (existingCategory) {
      res.status(400).json({ error: "Sub Category already exists" });
    } else {
      SubCategories.updateOne(query, reqBody, (error, data) => {
        if (error) {
          res.status(400).json({
            status: "Sub Category Update Failed",
            data: error,
          });
        } else {
          res.status(200).json({
            status: "Sub Category Update Successful",
            data: data,
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Sub Category Update fail" });
  }
};

// ! Sub Category listing

exports.searchByCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;

    const searchByCategory = await SubCategories.find({
      category_id: category_id,
    });
    res.status(200).json(searchByCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// !Sub Category Delete

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    SubCategories.deleteOne(query, (error, data) => {
      if (error) {
        res.status(400).json({
          status: "Category Delete Failed",
          data: error,
        });
      } else {
        res.status(200).json({
          status: "Category Delete Successful",
          data: data,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error: "Category Delete failed" });
  }
};
