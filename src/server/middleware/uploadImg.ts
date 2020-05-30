import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const path = process.cwd() + "/uploads/products";

const MIME_TYPE_MAP: {
  [key: string]: string;
} = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (_req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuidv4().toString() + '_' + file.originalname);
  },
});

const fileFilter: any = (_req: any, file: any, cb: any): void => {
  if (MIME_TYPE_MAP[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Type file is not access'));
  }
};

export default multer({
  storage,
  fileFilter,
}).single('productPhoto');
