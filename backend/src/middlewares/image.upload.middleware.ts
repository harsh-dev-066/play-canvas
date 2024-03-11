import multer from 'multer';
import cloudinary from '../services/cloudinary.config'
import { AuthMiddlewareInterface } from '../types/middleware.interface';
import { sendError } from '../handlers/response.handler';
import { StatusCodes } from 'http-status-codes';
import { ErrorHelper } from '../helpers/error.helper';


const storage = multer.diskStorage({
    // destination: (req: any, file: Record<string, any>, cb: (err: Error | null, destination: string) => void) => {
    //     cb(null, 'src/uploads/');
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const processMulter = multer({ storage });

const upload: AuthMiddlewareInterface['authenticate'] = async (req, res, next) => {
    try {
        cloudinary.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err);
                throw new ErrorHelper('Unauthorized Access', StatusCodes.UNAUTHORIZED);
            }

            res.locals.uploadResult = result
            return next()
        })
    } catch (error) {
        sendError(res, StatusCodes.INTERNAL_SERVER_ERROR, (error as Error).message, false, error);

    }
}
export { upload, processMulter };
