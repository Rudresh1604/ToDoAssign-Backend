const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  allTasksData: [
    {
      name: { type: String, required: false },
      isImportant: { type: Boolean, default: false, required: false },
    },
  ],
});

const user = mongoose.model("User", userSchema);
module.exports = user;
