module.exports.index = (req, res) => {
    if (req.originalUrl === '/' && req.method === 'GET') {
        res.render('home/home')
    } else {
        return true
    }
};
