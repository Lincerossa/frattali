const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
  username: String,
  email: String,
})

const Line = new Mongoose.Schema({
  color: String,
  thickness: Number,
  divisions: Number,
  points: [Number],
})

const CanvasSchema = new Mongoose.Schema({
  title: String,
  background: String,
  hd: Boolean,
  id: String,
  lines: [Line],
})

module.exports = {
  User: Mongoose.model('User', UserSchema),
  Canvas: Mongoose.model('Canvas', CanvasSchema),
}
