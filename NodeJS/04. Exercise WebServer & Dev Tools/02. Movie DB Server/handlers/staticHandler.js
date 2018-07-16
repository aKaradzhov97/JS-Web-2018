const allowedStaticFilesData = {
    ".html": 'text/html',
    ".js": 'application/javascript',
    ".css": 'text/css',
    ".png": 'image/png',
    ".jpg": 'image/jpeg'
};

module.exports = (req, res) => {
    let pathName = req.urlData.pathname;

    let isGetRequest = req.method === "GET";
    let isPublicFile =
        pathName.startsWith('/public/');
    let isAllowedFileType = Object
        .keys(allowedStaticFilesData)
        .map(k => pathName.endsWith(k))
        .reduce((prev, current) => prev || current, false);

    if (pathName == '/favicon.ico' && isGetRequest) {
        res.staticFile('/public/images/favicon.ico', 'image/x-icon');
    } else if (isGetRequest && isPublicFile && isAllowedFileType) {
        res.staticFile(pathName, getContentType(pathName));
    } else {
        return true;
    }
};

function getContentType(pathname) {
    return Object
        .keys(allowedStaticFilesData)
        .filter(k => pathname.endsWith(k))
        .map(k => allowedStaticFilesData[k])[0];
}