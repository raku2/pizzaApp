require('dotenv').config();
const bcrypt = require("bcrypt");
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET_KEY;

const UsersModule = require("../Models/users.model");

module.exports = {
    Registration: async (req, resp) => {
        try {
            const user = new UsersModule(req.body);

            if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.contactno || !req.body.password) {
                return resp.send(JSON.stringify("Please Fill all the fields!!"));
            }

            let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if(email_regex.test(req.body.email))
            {
                   
            }else{
                return resp.send([
                    {
                        "Status": "Fail",
                        "message": "Invalid Email"
                    },
                ]);
            }

            //Generate salt to hash the password
            const salt = await bcrypt.genSalt(10);

            //now we set password to hashed password
            user.password = await bcrypt.hash(user.password, salt);

            checkexists_email = await UsersModule.findOne({ email: req.body.email });

            if (checkexists_email) {
                console.log(JSON.stringify("Email already exists!"));
                return resp.send([
                    {
                        "Status": "Fail",
                        "message": "Email already exists!"
                    },
                ]);
            } else {
                let result = await user.save();

                if (result) {
                    console.log(result);
                    const message = [
                        {
                            "Status": "Success",
                            "message": "User Registered Successfully!!"
                        },
                    ];
                    return resp.send(message);
                    //return console.log(JSON.stringify("User Registered Successfully!!"));
                } else {
                    return resp.send([
                        {
                            "Status": "Fail",
                            "message": "Error while register user!"
                        },
                    ]);
                }
            }
        } catch (err) {
            console.log(err);
        }
    },
    Login: async (req, resp) => {
        try {
            const user = new UsersModule(req.body);

            if (!req.body.email || !req.body.password) {
                return resp.send(JSON.stringify("Please Fill all the fields!!"));
            }

            let result = await UsersModule.findOne({ email: req.body.email });

            if (result) {
                const validatePassword = await bcrypt.compare(req.body.password, result.password);

                if (validatePassword) {
                    if (result.role === "admin") {
                        Jwt.sign(
                            { result },
                            jwtKey,
                            { expiresIn: '2h' },
                            (error, token) => {
                                if (error) {
                                    return resp.send('something went wrong');
                                }
                                resp.send({ result, auth: token, role: result.role });
                                // localStorage.setItem('token', token);
                            }
                        );
                        //resp.send({ Status: "Success",message: "Login Success",result, role: result.role });
                    }

                    if (result.role === "user") {
                        Jwt.sign(
                            { result },
                            jwtKey,
                            { expiresIn: '2h' },
                            (error, token) => {
                                if (error) {
                                    return resp.send('something went wrong');
                                }
                                resp.send({ result, auth: token, role: result.role });
                                // localStorage.setItem('token', token);
                            }
                        );
                        //resp.send({ Status: "Success",message: "Login Success",result, role: result.role });
                    }
                } else {
                    return resp.send([
                        {
                            "Status": "Fail",
                            "message": "Invalid email or password!"
                        },
                    ]);
                }
            } else {
                return resp.send([
                    {
                        "Status": "Fail",
                        "message": "Invalid email or password!"
                    },
                ]);
            }
        } catch (err) {
            console.log(err);
        }
    },
    ListUsers: async(req,resp) => {
        try {
            let result = await UsersModule.find().select([
                "-password",
                "-role",
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
    }
}