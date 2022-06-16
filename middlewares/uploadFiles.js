const multer = require('multer')
const sharp = require('sharp')
const storage = multer.memoryStorage();

const uploader = multer({
    storage: storage,
});

module.exports = (req, res, next) => {
    const upload = uploader.single('img');
    upload(req, res, async err => {
        if (err) next(new Error(err));

        const file = req.file;
        const maxFileSize = process.env.MAX_FILE_SIZE * 1024 * 1024;
        const maxFileSharpSize = process.env.MAX_FILE_SIZE_SHARP * 1024 * 1024;

        if (file.size > maxFileSize) return next(new Error(`image size is more than ${process.env.MAX_FILE_SIZE}mb!`));
        if (!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(file.originalname)) return next(new Error(`only images are allowed!!`));

        const path = `./uploads/${file.originalname}`;
        if (file.size > maxFileSharpSize) {
            await sharp(file.buffer).resize(500, 300).toFile(path);
        } else {
            await sharp(file.buffer).toFile(path);
        }
        next();
    })
}