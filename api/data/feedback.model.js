const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const string = require("joi/lib/types/string");

const feedbackSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  message: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Feedback = mongoose.model("Feedback", feedbackSchema);
