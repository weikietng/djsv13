import mongoose from "mongoose";

let Schema = new mongoose.Schema({

  user: String,
  content: Array

});
export default mongoose.model("warns", Schema)