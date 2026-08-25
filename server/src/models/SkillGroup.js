import mongoose from "mongoose";

const skillGroupSchema = new mongoose.Schema(
  {
    category: String,
    order: Number,
    items: [String],
  },
  { timestamps: true }
);

export const SkillGroup = mongoose.model("SkillGroup", skillGroupSchema);
