import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"], 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  learningLanguage: {
    type: String,
  },
  fluencyLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  motivation: {
    type: String,
    enum: ["wanna chat", "wanna call"], 
  },
});

const User = mongoose.model("User", userSchema);
export default User;