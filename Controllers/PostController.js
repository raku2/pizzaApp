const PostsModule = require("../Models/posts.model");
const TopicsModule = require("../Models/topics.model");
const UsersModule = require("../Models/users.model");
const PostInteractionModule = require("../Models/postinteraction.model");

module.exports = {
    UploadPost: async (req, resp) => {
        try {
            const post = new PostsModule(req.body);

            if (!req.body.user_id || !req.body.topic_id || !req.body.content) {
                return resp.send(JSON.stringify("Please enter topic name"));
            }

            let checkUserExists = await UsersModule.findOne({ _id: req.body.user_id });

            let checkTopicExists = await TopicsModule.findOne({ _id: req.body.topic_id });

            if (checkUserExists && checkTopicExists) {

                let result = post.save();

                if (result) {
                    console.log(result);
                    return resp.send([
                        {
                            "Status": "Success",
                            "message": "Post uploaded Successfully!!"
                        },
                    ]);
                } else {
                    return resp.send([
                        {
                            "Status": "Fail",
                            "message": "Error while upload post!"
                        },
                    ]);
                }

            } else {
                return resp.send([
                    {
                        "Status": "Fail",
                        "message": "User or topic not found!"
                    },
                ]);
            }

        } catch (err) {
            console.log({ "Something went wrong!": err });
        }
    },
    ListPosts: async (req, resp) => {
        try {
            let result = await PostsModule.find().populate('user_id', 'first_name last_name').populate('topic_id', 'topic_name').select([
                "-__v"
            ]);

            if (result) {
                return resp.send([
                    {
                        "Data": result,
                        "Status": "Success"
                    },
                ]);
            } else {
                return resp.send([
                    {
                        "message": "No Record Found!"
                    },
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    },
    PostInteraction: async (req, resp) => {
        try {
            const post_interaction = new PostInteractionModule(req.body);

            if (!req.body.user_id || !req.body.post_id) {
                return resp.send(JSON.stringify("Please enter topic name"));
            }

            let checkUserExists = await UsersModule.findOne({ _id: req.body.user_id });

            let checkPostExists = await PostsModule.findOne({ _id: req.body.post_id });

            if (checkUserExists && checkPostExists) {
                let result = post_interaction.save();

                if (result) {
                    console.log(result);
                    return resp.send([
                        {
                            "Status": "Success",
                            "message": "Post Interaction Successfull!!"
                        },
                    ]);
                } else {
                    return resp.send([
                        {
                            "Status": "Fail",
                            "message": "Error while interact with post!"
                        },
                    ]);
                }
            } else {
                return resp.send([
                    {
                        "Status": "Fail",
                        "message": "User or post not found!"
                    },
                ]);
            }
        } catch (err) {
            console.log({ "Something went wrong!": err });
        }
    },
    List_PostInteraction: async (req, resp) => {
        try {
            let result = await PostInteractionModule.find().populate('user_id', 'first_name last_name').populate('post_id', 'content').select([
                "-__v"
            ]);

            if (result) {
                return resp.send([
                    {
                        "Data": result,
                        "Status": "Success"
                    },
                ]);
            } else {
                return resp.send([
                    {
                        "message": "No Record Found!"
                    },
                ]);
            }
        } catch (err) {
            console.log({ "Something went wrong!": err });
        }
    },

    ExpirePost: async (req, resp) => {
        try {
            let result = await PostsModule.find().select([
                "-topic_id",
                "-content",
                "-__v"
            ]);
            // return resp.json(result);
            // const created_at = result['created_at'];

            for (const post of result) {
                const id = post._id;
                
                const postCreatedAt = new Date(post.createdAt);
                
                let currentDate = new Date();

                // Calculate the time difference in milliseconds
                const timeDifference = currentDate.toISOString() - postCreatedAt.toISOString();

                const isoDate = new Date(post.createdAt);

                // Extract the date portion
                const datePart = isoDate.toISOString().split('T')[0];
                currentDate = currentDate.toISOString().split('T')[0];

                if(currentDate > datePart)
                {
                    //return console.log("Current date is big");

                    const options = {
                        new: true
                    }

                    const update_isexpire = await PostsModule.findByIdAndUpdate(
                        id,
                        { $set: { isexpire: 1 } },
                        options
                    );

                    if(update_isexpire)
                    {
                        console.log("Post Updated");
                    }else{
                        console.log("Error while expire post");
                    }
                }
            }
        } catch (err) {
            console.log({ "Something went wrong!": err });
        }
    },

    List_ExpirePosts: async (req, resp) => {
        try {
            let result = await PostsModule.find({isexpire: 1}).populate('user_id', 'first_name last_name').populate('topic_id', 'topic_name').select([
                "-__v"
            ]);

            if (result) {
                return resp.send([
                    {
                        "Data": result,
                        "Status": "Success"
                    },
                ]);
            } else {
                return resp.send([
                    {
                        "message": "No Record Found!"
                    },
                ]);
            }
        } catch (err) {
            console.log({ "Something went wrong!": err });
        }
    },
}