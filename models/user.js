const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  }
});

module.exports = mongoose.model("User", UserSchema);
