const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const BlogController = require('./controllers/BlogController');
const CommentController = require('./controllers/CommentController');
const BagController = require('./controllers/BagController'); // เพิ่มการ import BagController

let multer = require("multer");

// upload section
let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function(req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        console.log(file);
        callback(null, file.originalname);
    }
})
let upload = multer({ storage: storage }).array("userPhoto", 10)

module.exports = (app) => {
    app.get('/users', UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);
    app.get('/user', isAuthenController, UserController.index);

    app.post('/blog', BlogController.create);
    app.put('/blog/:blogId', BlogController.put);
    app.delete('/blog/:blogId', BlogController.remove);
    app.get('/blog/:blogId', BlogController.show);
    app.get('/blogs', BlogController.index);

    // comment route
    // create comment
    app.post('/comment', CommentController.create);
    // edit comment, suspend, active
    app.put('/comment/:commentId', CommentController.put);
    // delete comment
    app.delete('/comment/:commentId', CommentController.remove);
    // get comment by id
    app.get('/comment/:commentId', CommentController.show);
    // get all comment
    app.get('/comments', CommentController.index);

    // Bag routes
    app.post('/api/bags', BagController.create);
    app.get('/api/bags', BagController.index);
    app.get('/api/bags/:bagId', BagController.show);
    app.put('/api/bags/:bagId', BagController.put);
    app.delete('/api/bags/:bagId', BagController.remove);

    // Upload file function
    app.post("/upload", function(req, res) {
        // isUserAuthenticated,
        upload(req, res, function(err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

    // Delete uploaded file function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename);

            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete successful");
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to delete the file'
            });
        }
    });
}
