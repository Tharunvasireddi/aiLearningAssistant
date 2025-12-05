import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
      trim: true,
      unique: true,
      min: [3, "username atleast 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "please provide valid email"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      select: false,
      minlength: [6, "password must be atleast 6 characters length"],
    },
    profileImage: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// hash passwords

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
  } catch (err) {
    console.log("error in user.js", err);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
