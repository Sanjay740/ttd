const multer = require('multer');
const sharp = require('sharp');
const backblaze = require("node-backblaze-b2");
const config = require("../config/config");
const ResponseMessages = require('../util/responseMessages')
const b2 = new backblaze({ accountId: config.b2Config.accountId, applicationKey: config.b2Config.applicationKey });
const fs = require("fs");
b2.authorize(function () { })

module.exports.uploadFile = function (request, response, next) {
    /**
     * Get the upload directory path for backblaze using api name.
     */
    let fileType = (request.path.includes('/saveOrder') || request.path.includes('/updateTransaction') || request.path.includes('/taskDocumentUpload') || request.path.includes('/saveFormData')) ? request.path.includes('/saveFormData') ? 'Transaction/FormData/Documents' : request.path.includes('/updateTransaction') ? 'Documents/Transaction' : request.path.includes('/taskDocumentUpload') ? 'Documents/Transaction/Task' : 'Documents/' + request.params.orderType : 'Images';

    /**
     * Set local upload directory for multer to upload files.
     */
    let upload = multer({ dest: 'temp', limits: { files: 15 } }).any();

    upload(request, response, async (err) => {
        if (err) {
            response.status(500).json(ResponseMessages.TryLater)
        } else {
            let jsonData = JSON.parse(request.body.jsonData);

            /**
             * If a new image is uploaded  while updating profile by deleting the previous image,
             * get the deleted image info for deleting it from backblaze.
             */
            if (fileType == 'Images' && jsonData[0].imageDeleted) {
                jsonData[0]['oldImageInfo'] = {};
                jsonData[0]['oldImageInfo']['fileName'] = jsonData[0]['imageInfo']['imageName'];
                jsonData[0]['oldImageInfo']['fileId'] = jsonData[0]["imageInfo"]['imageId'];
                // Incase the image is deleted while update without uploading a new one, delete the previous info.
                if (request.files.length == 0) {
                    jsonData[0]['imageInfo'] = {}
                }
            }



            /**
             * Incase no image/documents uploaded, pass the parsed data to next function.
             */
            if (request.files.length === 0) {
                request.body.jsonData = jsonData;
                next()
            } else {
                let uploadPromise = request.files.map(async (file, index) => {
                    let originalPath = file.path;
                    if (fileType !== 'Images') {
                        let data = await uploadFile(file, fileType)
                        jsonData.attachments[index].path = data.fileName;
                        jsonData.attachments[index].fileId = data.fileId;
                        removeFile(file.path)
                        return;
                    } else {
                        let newFileName = file.path + '.' + file.originalname.split(".").pop();
                        await renameFile(file.path, newFileName);
                        file.path = newFileName;
                        if (file.path !== originalPath) removeFile(originalPath);
                        file.path = await resizeFile(file, undefined, 45)
                        let data = await uploadFile(file, 'Images')
                        console.log(data);

                        removeFile(file.path);
                        jsonData[0]["imageInfo"] = {}
                        jsonData[0]["imageInfo"]['imageName'] = data.fileName;
                        jsonData[0]["imageInfo"]['imageId'] = data.fileId;
                        return;
                    }
                })

                await Promise.all(uploadPromise);
                request.body.jsonData = jsonData;
                next()
            }
        }
    })
}

async function renameFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, async (e) => {
            if (!e) {
                resolve()
            } else {
                reject()
            }
        })
    })
}

function getUploadPayload(file, folder) {
    let fileName = (folder == 'Images') ? folder + "/" + file.filename + ".jpg" : folder + "/" + file.filename + "." + file.originalname.split(".").pop()
    return {
        bucketId: config.b2Config.bucketId,
        file: file.path,
        fileName: fileName,
        contentType: file.mimetype,
        retryAttempts: 3,
    }
}

function removeFile(path) {
    fs.unlink(path, function (err) {
        if (err) {
            return;
        } else {
            console.info('Removed ' + path)
        }
    })
}

module.exports.deleteRemoteFile = async function (fileInfo) {
    return new Promise((resolve, reject) => {
        b2.deleteFile(fileInfo, function (err, file) {
            if (err) console.log(err);
            resolve(file)
        })
    })
}

/**
 * An asynchronous function to upload file to `BackBlaze` and return the info
 */
async function uploadFile(file, folder) {
    return new Promise((resolve, reject) => {
        let inp = getUploadPayload(file, folder)
        b2.uploadFile(inp, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

/**
 * An asynchronous function to resize an image file using
 * `Sharp` library.
 */
async function resizeFile(file, width, height) {
    try {
        var dir = 'temp/versions';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        let originalExt = file.originalname.split(".").pop();
        let newPath = originalExt == 'jpg' ? dir + '/' + file.filename + '.jpg' : file.path.replace(file.originalname.split(".").pop(), 'jpg');

        await sharp(file.path)
            .resize(width, height)
            .toFile(newPath)
        return newPath;
    } catch (error) {
        console.log('Error in sharp : ', error);
    }
}
