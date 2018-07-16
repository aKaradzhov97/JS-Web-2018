/**
 * Created by George-Lenovo on 6/4/2018.
 */

function responseFound(res, contentType, location) {
    res.writeHead(302, {
        'Content-Type': contentType,
        'Location': location
    });

    res.end()
}

function responseDownloadFile(res, contentType, data) {
    res.writeHead(200, {
        'Content-Type': contentType,
        'Content-disposition': `attachment; filename="${contentType}"`
    });
    res.end(data)
}

function responseOk(res, contentType, data) {
    res.writeHead(200, {
        'Content-Type': contentType
    });

    res.end(data)
}

module.exports = {
    responseFound,
    responseOk,
    responseDownloadFile
};