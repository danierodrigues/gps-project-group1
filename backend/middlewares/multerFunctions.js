const helperMulter = require('../helpers/multer');
const multer  = require('multer');




function uploadVideo(req, res, next){

    let upload = multer({ storage:helperMulter.storageAndDestination, fileFilter:helperMulter.videoFilter }).single('video');
    
    try{
        upload(req, res,next, function(err) {

            if (req.fileValidationError) {
                return res.status(500).json({'ok':false, 'errorMessage':req.fileValidationError});
            }
            else if (!req.file) {
                return res.status(500).json({'ok':false, 'errorMessage':'Nenhum video selecionado.'});
            }
            else if (err instanceof multer.MulterError) {
                return res.status(500).json({'ok':false, 'error':err});
            }
            else if (err) {
                return res.status(500).json({'ok':false, 'error':err});
            }
            return next();
        });
    }catch(err){
        return res.status(500).json({'ok':false, 'error':err});
    }
    
};




module.exports = {
    uploadVideoFunction:uploadVideo
}