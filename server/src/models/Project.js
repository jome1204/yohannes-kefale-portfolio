import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    title: String,
    subtitle: String,
    category: String,
    year: String,
    featured: { type: Boolean, default: false },
    order: Number,
    summary: String,
    problem: String,
    solution: String,
    outcome: String,
    stack: [String],
    highlights: [String],
    repoUrl: String,
    liveUrl: String,
    cover: {
      from: String,
      to: String,
      accent: String,
      motif: String,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
