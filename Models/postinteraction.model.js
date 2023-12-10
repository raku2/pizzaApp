const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        user_id:{
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'tbl_users'}],
        },

        post_id:{
            type: [{type: mongoose.Schema.Types.ObjectId, ref: 'tbl_posts'}],
        },

        action_like:{
            type: Number,
            default: 0
        },

        action_dislike:{
            type: Number,
            default: 0
        },

        action_comment:{
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

const PostInteractionModule = mongoose.model("tbl_postinteraction",schema);
module.exports = PostInteractionModule;