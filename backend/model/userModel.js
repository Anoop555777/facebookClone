const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,

      minlength: [2, 'name should be atleast 2 characters'],
      maxlength: [30, 'name should be atmost 30 characters'],
    },
    last_name: {
      type: String,
      required: [true, 'last name is required'],
      trim: true,
      text: true,
      minlength: [2, 'name should be atleast 2 characters'],
      maxlength: [30, 'name should be atmost 30 characters'],
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      trim: true,
      minlength: [2, 'name should be atleast 2 characters'],
      maxlength: [30, 'name should be atmost 30 characters'],
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please provide valid email'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: 8,
      select: false,
    },

    picture: {
      type: String,
      trim: true,
      default:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: {
        values: ['male', 'female', 'transgender'],
        message: 'please enter valid gender',
      },
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: mongoose.Schema.ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
