const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null,"uploads/")
    },
    filename: function(req,file,cb){
        const filename = file.originalname;

        cb(null,Date.now()+'squimstech'+filename);
    }
});

exports.upload = multer({storage:storage})