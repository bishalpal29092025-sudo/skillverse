import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  image?: string;

  headline?: string;
  bio?: string;
  location?: string;

  skillsOffered: string[];
  skillsWanted: string[];
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    headline: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    skillsOffered: {
      type: [String],
      default: [],
    },

    skillsWanted: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

export default User;