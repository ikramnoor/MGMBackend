const { omit } = require("lodash");
const { Transfer } = require("../data/transfer.model");
const { User } = require("../data/user.model");

module.exports.profile = async (req, res) => {
  console.log("In profile api");
  try {
    const {
      user: { _id },
    } = req;
    const user = await User.findById(_id);

    if (!user)
      return res.status(404).send({
        error: true,
        message: "User not found",
        data: {},
      });
    res.status(200).send({
      error: false,
      message: "profile fetched successfully",
      data: {
        user: omit(user, ["password"]),
      },
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Internal server error",
      data: {},
    });
  }
};

module.exports.getAll = async (req, res) => {
  console.log("In getAll api");
  try {
    const {
      user: { _id },
    } = req;
    const users = await Transfer.find({ owner: _id });
    console.log("s", users);
    res.status(200).send({
      error: false,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Internal server error",
      data: {},
    });
  }
};

module.exports.withdrawMoney = async (req, res) => {
  // console.log("In DELETE USER BY ID api");
  const {
    body: {
      _id,
      username,
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
    console.log(amount);
    const user = await User.findById({ _id: owner });
    console.log(user);
    const newAmount = (user.totalAmount -= parseInt(amount));
    const user1 = await User.findByIdAndUpdate(
      { _id: owner },
      {
        totalAmount: newAmount,
      }
    );
    const blog = new Transfer({
      amount,
      count10,
      count20,
      count50,
      count100,
      count500,
      count1000,
      count5000,
      isTransfered: false,
      owner,
    });

    blog.save();
    console.log(user1);
    res.status(200).send({
      error: false,
      message: "Withdrawn successfully",
    });
  } catch (err) {
    console.log("Delete user by id api failed", err);
    res.status(500).send({
      error: true,
      message: "Internal server error",
      data: {},
    });
  }
};
module.exports.transferMoney = async (req, res) => {
  // console.log("In DELETE USER BY ID api");
  const {
    body: { username, amount },
    user: { _id: onwer },
  } = req;
  try {
    console.log(onwer);
    console.log(amount);
    const user = await User.find({ username: username });
    const Currentuser = await User.find({ _id: onwer });
    console.log(Currentuser);
    const newAmount = (user[0].totalAmount += parseInt(amount));
    console.log(newAmount);
    const lessAmount = (Currentuser[0].totalAmount -= parseInt(amount));
    const currentUser = await User.findByIdAndUpdate(
      { _id: onwer },
      { totalAmount: lessAmount }
    );
    const user1 = await User.findByIdAndUpdate(
      { _id: user[0]._id },
      { totalAmount: newAmount }
    );
    const blog = new Transfer({
      amount,
      count10: 0,
      count20: 0,
      count50: 0,
      count100: 0,
      count500: 0,
      count1000: 0,
      count5000: 0,
      isTransfered: true,
      owner: onwer,
    });

    blog.save();

    console.log(user1);
    res.status(200).send({
      error: false,
      message: "Transfer successfully",
    });
  } catch (err) {
    console.log("Delete user by id api failed", err);
    res.status(500).send({
      error: true,
      message: "Internal server error",
      data: {},
    });
  }
};
