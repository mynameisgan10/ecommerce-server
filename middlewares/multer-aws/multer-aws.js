const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const mime = require('mime');

aws
    .config
    .update(
        {secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, accessKeyId: process.env.AWS_ACCESS_KEY, region: 'ap-southeast-1'}
    );

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'imagetest1999',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        contentType: function (req, file, cb) {
            cb(null, file.mimetype)
        },
        key: function (req, file, cb) {
            cb(null, "item-images/" + Date.now().toString() + file.originalname)
        }
    })
})

module.exports = upload;