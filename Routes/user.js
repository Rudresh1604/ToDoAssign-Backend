const User = require("../models/userMode");
const router = require("express").Router();
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username + password);

  try {
    let user;
    const hashPassword = await bcryptJs.hash(password, 10);

    user = await User.create({
      username: username,
      password: hashPassword,
    });

    if (user) {
      console.log(user);
      res.status(200).send({
        data: user,
        message: "Thank You ! Registered Successfully",
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: "Ooops ! Something went wrong", success: false });
    }
  } catch (error) {
    console.log(error.message);

    res.status(200).send(error);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user && (await bcryptJs.compare(password, user.password))) {
      const token = await jwt.sign(
        {
          username: username,
          userId: user._id,
        },
        "anykey",
        { expiresIn: "2hr" }
      );
      //Save the token into the cookie in server
      res.cookie("token", token, {
        maxAge: 3 * 60 * 60 * 1000,
        httpOnly: false,
      });
    }
    if (user) {
      console.log(user);

      res.status(200).send({
        // data: user,
        message: "Log In Successfully",
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: "Ooops ! Something went wrong", success: false });
    }
    // res.redirect("/club-login/csi");
  } catch (error) {
    console.log(error.message);

    res.status(200).send(error);
  }
});

router.post("/add-task", async (req, res) => {
  const { userId, task } = req.body;
  console.log(task);

  try {
    let user = await User.findById(userId);
    if (user) {
      user.alltasksdata.push(task);
      await user.save();
      res.status(200).send({
        message: "Thank You ! Registered Successfully",
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: "Ooops ! Something went wrong", success: false });
    }
  } catch (error) {
    res.status(200).send(error);
  }
});

router.get("/show-task", async (req, res) => {
  const { userId } = req.body;
  try {
    let user = await User.findById(userId);
    if (user) {
      res.status(200).send({
        data: user.allTasksData,
        message: "Thank You ! Registered Successfully",
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: "Ooops ! Something went wrong", success: false });
    }
  } catch (error) {
    res.status(200).send(error);
  }
});

module.exports = router;
