const fs = require('fs');
const path = require("node:path");

module.exports = ({ imagePath, onSuccess, onError }) => {
    const utilsDirectory = __dirname;
    const imagesDirectory = path.join(utilsDirectory, '..', 'images');
    const filePath = path.join(imagesDirectory, imagePath);  // path.join ile doğru şekilde birleştiriyoruz.

    fs.unlink(filePath, (err) => {  // fs.unlink ile asenkron dosya silme işlemi yapılıyor
        if (err) {
            return onError(err);  // Hata oluşursa onError çağrılır
        } else {
            return onSuccess();  // Başarıyla silindiyse onSuccess çağrılır
        }
    });
}
