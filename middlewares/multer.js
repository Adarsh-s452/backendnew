import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});


const upload = multer({
    storage: storage,
  }).fields([
    { name: "poster", maxCount: 1 },
    { name: "castImages", maxCount: 10 },
  ]);
export default upload;

