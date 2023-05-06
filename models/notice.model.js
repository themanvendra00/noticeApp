const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
  author: String,
  title: String,
  description: String,
  date: { type: Date, default: Date.now() },
});

const NoticeModel = mongoose.model("notice", noticeSchema);

module.exports = {
  NoticeModel,
};
