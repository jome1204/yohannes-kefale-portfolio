import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: String,
    organization: String,
    location: String,
    period: String,
    startDate: String,
    current: { type: Boolean, default: false },
    order: Number,
    bullets: [String],
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);
