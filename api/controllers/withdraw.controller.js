const mongoose = require("mongoose");
const { Feedback } = require("../data/feedback.model");
const { User } = require("../data/user.model");

const { Blog } = require("../data/withdraw.model");
// const { ReviewBlog } = require("../data/blogReview.model");

module.exports.postBlog = async (req, res) => {
  console.log("Inside Post Job api");

  const {
    body: {
      amount,
      count10,
      count20,
      count50,
      count100,
      count500,
      count1000,

      count5000,
    },
    user: { _id: owner },
  } = req;
  try {
    const blog = new Blog({
      amount,
      count10,
      count20,
      count50,
      count100,
      count500,
      count1000,
      count5000,
      owner,
    });

    blog.save();
    const user = await User.findById({ _id: owner });
    const newAmount = (user.amount -= parseInt(amount));
    await User.findByIdAndUpdate({ _id: owner }, { amount: newAmount });
    res.send({
      blog,
      error: false,
      message: "Thanks for withdrawing successfully",
    });
  } catch (err) {
    console.log("Blog post api failed: ", err.message);
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};
module.exports.postFeedback = async (req, res) => {
  console.log("Inside Post Job api");

  const {
    body: { username, message },
  } = req;
  try {
    const blog = new Feedback({
      username,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    blog.save();

    res.send({
      blog,
      error: false,
      message: "Thanks for Feedback",
    });
  } catch (err) {
    console.log("Blog post api failed: ", err.message);
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.getAllBlogs = async (req, res) => {
  console.log("Inside Get All blog API");
  const {
    user: { _id },
  } = req;
  try {
    let Blogs = [];
    const withdraw = await Blog.find({ owner: _id, isDeleted: false });
    console.log(withdraw);

    res.send({ withdraw: withdraw, message: "Blogs Fetched successfully" });
  } catch (err) {
    console.log("get all blog api failed: ", err);
    return res.status(500).send({ error: true, message: err.message });
  }
};
