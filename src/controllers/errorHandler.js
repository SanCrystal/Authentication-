module.exports.handle404 = (req, res) => {
    res.status(404).render('error/404.ejs', { data: req.query.user });
}