import multer from 'multer';
import { MulterFile } from '../types';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb){
    cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
  },
});

const checkFileType = (file:MulterFile, cb: multer.FileFilterCallback) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname){
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
};

export const uploadFile = () => {
  return multer({
    storage: storage,
    limits: {
      fileSize: 15000000,
    },
    fileFilter: (_req, file, cb) => {
      checkFileType(file, cb);
    },
  });
};
