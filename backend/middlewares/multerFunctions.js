const helperMulter = require('../helpers/multer');
const multer  = require('multer');




function uploadVideo(req, res, next){

    let upload = multer({ storage:helperMulter.storageAndDestination, fileFilter:helperMulter.videoFilter }).single('video');
    console.log('inicio da função');
    
    try{
        upload(req, res,next, function(err) {

            if (req.fileValidationError) {
                console.log('req.file. validation error');
                return res.status(500).json({'ok':false, 'errorMessage':req.fileValidationError});
            }
            else if (!req.file) {
                console.log('select video error');
                return res.status(500).json({'ok':false, 'errorMessage':'Nenhum video selecionado.'});
            }
            else if (err instanceof multer.MulterError) {
                console.log('multererror');
                return res.status(500).json({'ok':false, 'error':err});
            }
            else if (err) {
                console.log('error else');
                return res.status(500).json({'ok':false, 'error':err});
            }

            console.log('returnado');
            return next();
        });
    }catch(err){
        console.log('catch');
        return res.status(500).json({'ok':false, 'error':err});
    }
    
};




module.exports = {
    uploadVideoFunction:uploadVideo
}