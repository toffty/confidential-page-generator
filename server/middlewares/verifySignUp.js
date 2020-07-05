import UserModel from "../schema/User";

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    UserModel.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }




            next();
        });

};



const verifySignUp = {
    checkDuplicateUsernameOrEmail,

};

module.exports = verifySignUp;