import mongoose from "mongoose";

export async function connectDb(uri) {
  await mongoose.connect(uri);
  return { mode: "mongodb", uri: uri.replace(/\/\/([^@]+)@/, "//***@") };
}

export async function disconnectDb() {
  await mongoose.disconnect();
}
