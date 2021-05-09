const User = require("../models/user");

exports.getAllUsers = (req, res, next) => {
  User.find({}).then((users) => {
    res.status(200).json({ message: "success", data: users });
  });
};

exports.addUser = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
    });

    newUser
      .save()
      .then((user) =>
        res
          .status(200)
          .json({ message: "User created successfully", data: user })
      )
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.userID)
    .then((user) => {
      if (user) return res.status(200).json({ message: "success", data: user });
      return res.status(200).json({ message: "User not found", data: {} });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.userID,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  )
    .then((user) => {
      if (!user)
        return res.status(200).json({ message: "User not found", data: {} });
      user.save();
      res
        .status(200)
        .json({ message: "Updated user successfully", data: user });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.userID)
    .then((user) => {
      if (!user)
        return res.status(200).json({ message: "User not found", data: {} });
      res.status(200).json({ message: "Deleted user completely", data: user });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
