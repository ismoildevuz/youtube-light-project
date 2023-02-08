module.exports = (req, res, next) => {
    if (!req.session.isLogined) {
        res.redirect('/login');
    }
    next();
};