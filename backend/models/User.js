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
      match: [/^\S+@\S+\.S+$/, "please provide a valid emial "],
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
  },
  { timestamps: true }
);

// hash passwords

userSchema.pre("save", async () => {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.camparePasswords = async (enteredPassword) => {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
