import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import Define from './Define';



const UPLOAD_DESTINATION = Define.UPLOAD_DESTINATION
let MyUploader = multer({
    // //where to upload
    // dest: uploadFolder,
    //file size limit
    limits: {
        fileSize: 1024 * 1024 * 5,//5mb(koto byte)
    },
    fileFilter: (req, file, cb: FileFilterCallback) => {
        /**
         * file{
         *  fieldname:"img",->html filed name
         *  originalname:"abac.png",
         *  encoding:"",
         *  mimetype:"image/png" || "application/pdf"
         * }
         * 
         * AXIOS setup
         * 
         * 
         * 
         */
        if (file.fieldname === 'img') {//only for img/pdf
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) {
                cb(null, true)
            } else {
                cb(new Error("file type not suppported"))
            }
        } else {
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
                cb(null, true)
            } else {
                //catch this error in global ErrorMid.js file
                cb(new Error("file type not suppported"))
            }
        }

    },//fileFilter
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_DESTINATION)
        },
        filename: (req, file, cb) => {
            const extention = path.extname(file.originalname)
            const file_name = file.originalname.replace(extention, "").toLowerCase().split(" ").join("-") + "-" + Date.now() + extention
            cb(null, file_name)
        }
    })
})
//end basic desination+file size+file filter

export default MyUploader