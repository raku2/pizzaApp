const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user_id:{
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'tbl_users'}],
        },

        topic_id:{
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'tbl_topics'}],
        },

        content:{
            type: String,
            require: [true, "Content is required!!"]
        },
        
        isexpire:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

const PostsModule = mongoose.model("tbl_posts",schema);
module.exports = PostsModule;