import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channel: String,
  admins: [String],
  scrapedTimes: Number,
  lastScrapedId: Number,
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
