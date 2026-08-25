import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: String,
    firstName: String,
    lastName: String,
    title: String,
    headline: String,
    location: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    resumeUrl: String,
    photoUrl: String,
    availability: String,
    summary: String,
    stats: [
      {
        label: String,
        value: String,
      },
    ],
    languages: [
      {
        name: String,
        level: String,
      },
    ],
    education: [
      {
        degree: String,
        school: String,
        detail: String,
      },
    ],
    certifications: [String],
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
