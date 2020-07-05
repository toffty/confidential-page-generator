import PageModel from "../schema/Page.js";
import textToImage from "text-to-image";
import UserModel from "../schema/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class PageController {

    index(req, res) {
        const authorId = req.params.id;
        PageModel.find({author: authorId}, (err, pages) => {
            if (err) {
                return res.status(404).json({
                    message: "No confident pages"
                });
            }
            res.json(pages);
        });

    }

    show(req, res) {
        const id = req.params.id;
        PageModel.findById(id, (err, page) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                })
            } else {
                res.json(page);
                if (page) {
                    if (page.openings <= 0) {
                        console.log("kekw")
                        PageModel.findOneAndRemove({_id: id}).then(page => {
                            res.json({
                                message: `Page deleted`
                            });


                        }).catch(err => {
                            return res.json({
                                message: 'User not found'
                            });
                        });


                    } else {

                        const current_date = new Date()
                        textToImage.generate(page.text +
                            '\n ' +
                            current_date.toDateString() +
                            '\n ' +
                            'Количество открытий осталось: ' +
                            (page.openings - 1).toString()).then((dataURL) => {
                            console.log(page.text)
                            PageModel.updateOne({_id: id},
                                {
                                    content: dataURL,
                                    openings: page.openings - 1
                                }).then(() => {
                            })
                        })
                    }

                } else {
                    console.log('No page')
                }

            }
        });
    }

    create(req, res) {

        const current_date = new Date()
        textToImage.generate(req.body.text + '\n ' + current_date.toDateString() + '\n ' + 'Количество открытий: ' + req.body.openings).then((dataURL) => {
            const postData = {
                username: req.body.username,
                password: req.body.password,
                lifetime: req.body.lifetime,
                text: req.body.text,
                content: dataURL,
                openings: req.body.openings
            }
            const page = new PageModel(postData)
            page.save().then(obj => {
                res.json(obj);
            }).catch(reason => {
                res.json(reason);
            })
        });

    };

}

export default PageController;