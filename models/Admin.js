const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// user model/Schema defines the structure of our user
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 25,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: [isEmail],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 25,

    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png'
    },

  },
  {
    timestamps: true,
  }
);

// password crypting
adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.statics.login = async function (username, password) {
  const admin = await this.findOne({ username });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect username');
}

const AdminModel = mongoose.model('admin', adminSchema);
module.exports = AdminModel;