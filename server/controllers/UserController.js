import express from "express";
import UserModel from "../schema/User.js";

import bcrypt from "bcrypt"


class UserController {
    show(req, res) {
        const id = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                })
            } else {
                res.json(user);
            }
        });
    }

    getMe(req, res) {
        //Authentication
    }

    delete(req, res) {
        const id = req.params.id;
        console.log(id);
        UserModel.findOneAndRemove({_id: id}).then(user => {
            res.json({
                message: `User ${user.username} deleted`
            });


        }).catch(err => {
            return res.json({
                message: 'User not found'
            });
        });

    }

}

export default UserController;