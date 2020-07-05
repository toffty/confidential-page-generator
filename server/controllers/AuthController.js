
import UserModel from "../schema/User.js";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
class AuthController{
    SignUp = (req, res) => {
        const user = new UserModel({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.json(user)

        });
    };

    SignIn = (req, res) => {
        UserModel.findOne({
            username: req.body.username
        })

            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }

                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }

                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // 24 hours
                });

                const authorities = [];


                res.status(200).json({
                    user: user,
                    token: token

                });
            });
    };

}


export default AuthController;