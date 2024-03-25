import multer from "multer";
import {randomBytes} from "crypto"


export default class Multer {
    fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/images");
        },
        filename: (req, file, cb) => {
            cb(null, randomBytes(4).toString("hex") + "-" + file.originalname);
        },
    });

    fileFilter = (req: any, file: any, cb: any) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/svg" ||
            file.mimetype === "application/pdf"

        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    config = () => multer({storage: this.fileStorage, fileFilter: this.fileFilter}).any()
}