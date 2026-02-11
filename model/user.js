import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,  // Changed from 'string' to 'String'
    unique: true,
    required: [true, "Email is required"],
  },
  username: {
    type: String,  // Changed from 'string' to 'String'
    required: [true, "Username is required"],
  },
  image: {
    type: String,  // Changed from 'string' to 'String'
  }
});

const User = models.User || model("User", UserSchema);

export default User;