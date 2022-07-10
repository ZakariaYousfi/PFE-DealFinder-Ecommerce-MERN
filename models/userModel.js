const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

// user model/Schema defines the structure of our user
const userSchema = new mongoose.Schema(
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
    bio: {
      type: String,
      maxLength: 1024
    },
    addedToCart: {
      type: [String]
    },
    following: {
      type: [String]
    },
    followers: {
      type: [String]
    },
    position: {
      type: [Number]
    }
  },
  {
    timestamps: true,
  }
);

// password crypting
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect Email');
}
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;