import PageModel from "../schema/Page.js";
import textToImage from "text-to-image";


class PageController{
    index(req, res){
        const authorId = req.params.id;
        PageModel.find({ author: authorId }, (err,pages)=>{
           if(err){
               return res.status(404).json({
                   message: "No confident pages"
               });
           }
           res.json(pages);
        });

    }
    show (req, res){
        const id = req.params.id;
        PageModel.findById(id, (err, page)=>{
            if (err){
                return res.status(404).json({
                    message: "Not found"
                })
            }
            else{
                res.json(page);
            }
        });
    }
    create(req, res){
        const current_date = new Date()
        let openings_counter = 0;
        textToImage.generate(req.body.text + '\n ' + current_date.toDateString() +  '\n ' + 'Количество открытий: ' + openings_counter.toString() ).then((dataURL)=>{
            const postData = {
                username: req.body.username,
                password: req.body.password,
                lifetime: req.body.lifetime,
                content: dataURL,
                openings: openings_counter
            }
            const page = new PageModel(postData)
            page.save().then(obj =>{
                res.json(obj);
            }).catch(reason => {
                res.json(reason);
            })
        });

    };
}

export default PageController;