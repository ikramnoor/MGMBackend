const { User, validateUser } = require("../data/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const { pick, isEmpty } = require("lodash");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SEND_GRID_KEY);

module.exports.signUpUser = async (req, res) => {
  console.log("in signup api");
  console.log(req.body);
  let user = await User.findOne({
    // email: req.body.email.toLowerCase(),
    username: req.body.username,
    isDeleted: false,
  });
  if (user)
    return res.status(400).send({
      error: true,
      message: " username is already registered",
    });

  user = new User({
    ...pick(req.body, ["email", "username", "password"]),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // user.email = user.email.toLowerCase();
  user.username = user.username.toLowerCase();
  user.profileImg =
    "https://gulf-academy-profile-images.s3.amazonaws.com/default-profile-image.png";
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("token", token).send({
    data: {},
    error: false,
    message: "Your account is registered successfully",
  });
};

module.exports.loginUser = async (req, res) => {
  console.log("in user login api");
  const {
    body,
    body: { username, password },
  } = req;

  let user = await User.findOne(
    {
      username: username.toLowerCase(),
    },
    {
      password: 1,
      username: 1,
      _id: 1,
      isAdmin: 1,
      totalAmount: 1,
    }
  );
  if (user) {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const token = user.generateAuthToken();
        return res.send({
          data: {
            token,
            user: pick(user, ["username", "isAdmin", "_id", "totalAmount"]),
          },
          error: false,
          message: "Login successful",
        });
      }
      return res
        .status(400)
        .send({ error: true, message: "Invalid username or password" });
    });
  } else {
    return res.status(404).send({ error: true, message: "No User Found" });
  }
};
