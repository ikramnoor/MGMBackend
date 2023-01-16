const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
  },
  count10: {
    type: Number,
  },
  count20: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  count50: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  count100: {
    type: Number,
  },
  count500: {
    type: Number,
  },
  count5000: {
    type: Number,
  },
  count1000: {
    type: Number,
  },
});

exports.Blog = mongoose.model("Exchange", blogSchema);
