const TopicsModule = require('../Models/topics.model');

module.exports = {
    RegisterTopic: async(req,resp) => {
        try{
            const topic = new TopicsModule(req.body);

            if(!req.body.topic_name)
            {
                return resp.send(JSON.stringify("Please enter topic name"));
            }

            checktopic_exists = await TopicsModule.findOne({ topic_name: req.body.topic_name });

            if(checktopic_exists)
            {
                console.log(JSON.stringify("Topic already exists!"));
                return resp.send([
                    {
                        "Status": "Fail",
                        "message": "Topic already exists!"
                    },
                ]);
            }else{
                let result = await topic.save();

                if (result) {
                    console.log(result);
                    return resp.send([
                        {
                            "Status": "Success",
                            "message": "Topic Registered Successfully!!"
                        },
                    ]);
                } else {
                    return resp.send([
                        {
                            "Status": "Fail",
                            "message": "Error while register topic!"
                        },
                    ]);
                }
            }
        }catch(err)
        {
            console.log({"Something went wrong!": err});
        }
    },
    ListTopics: async(req,resp) => {
        try {
            let result = await TopicsModule.find().select([
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
            console.log({"Something went wrong!": err});
        }
    }
}