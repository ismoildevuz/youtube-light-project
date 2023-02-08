module.exports = (req, res, next) => {
    res.locals.isLogined = req.session.isLogined;
    next();
};