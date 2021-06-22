const multer  = require('multer');
const { v4: uuidv4 } = require('uuid');

const VideoFilter = function(req, file, cb) {
    if (file.mimetype == "video/mp4") {
        cb(null, true);
    } else {
        console.log("error");
        req.fileValidationError = 'São permitidos apenas videos.';
        return cb(new Error('São permitidos apenas videos.'), false);
    }
};

var storageVideos = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/videos')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + '.mp4')
    },
});



module.exports = {
    videoFilter: VideoFilter,
    storageAndDestination:storageVideos
}