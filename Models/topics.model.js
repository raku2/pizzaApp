const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        topic_name: {
            type: String,
            require: [true, "Topic name is required!!"]
        },
    },
    { timestamps: true }
);

const TopicsModule = mongoose.model("tbl_topics",schema);
module.exports = TopicsModule;