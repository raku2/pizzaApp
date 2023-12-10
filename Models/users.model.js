const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            require: [true, "Firstname is required!!"]
        },

        last_name: {
            type: String,
            require: [true, "Lastname is required!!"]
        },

        contactno:{
            type: Number,
            require: [true, "Contactno is required!!"]
        },

        email:{
            type: String,
            require: [true, "Email is required!!"]
        },

        password:{
            type: String,
            require: [true, "Password is required!!"]
        },

        role:{
            type: String,
            default: "user"
        },
    },
    {timestamps: true}
);

const UsersModule = mongoose.model("tbl_users", schema);
module.exports = UsersModule;