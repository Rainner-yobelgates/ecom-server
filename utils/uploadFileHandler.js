import multer from "multer"
import path from 'path'

const formatType = {
    'image/png' : 'png',
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValidFormat = formatType[file.mimetype]
        let uploadError = new Error('Invalid format image jpg/jpeg/png')
        if (isValidFormat) {
            uploadError = null
        }

      cb(uploadError, 'public/uploads')

    },
    filename: function (req, file, cb) {
      const uniqueFile = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      cb(null, uniqueFile)
    }
  })
  
export  const upload = multer({ storage: storage })