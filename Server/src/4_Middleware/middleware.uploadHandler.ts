import multer from 'multer'

export const upload = multer({
  dest:'uploads/',
  limits: { fileSize: 1000 * 1024 * 1024 },
})

//noting for later that multer has ability to process multiple files with the .array method