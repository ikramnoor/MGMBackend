const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const string = require("joi/lib/types/string");

const transferSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    default: 0,
  },

  isTransfered: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isTransfered: {
    type: Boolean,
    default: false,
  },
  count10: {
    type: Number,
  },
  count20: {
    type: Number,
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

exports.Transfer = mongoose.model("Tranfser", transferSchema);
