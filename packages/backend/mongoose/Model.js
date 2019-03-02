import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  username: String,
  email: String,
});

module.exports = {
  User: Mongoose.model("User", UserSchema),
};
