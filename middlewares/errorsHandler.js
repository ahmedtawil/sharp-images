module.exports = (err, req, res, next) => {
    console.log(err.message);
    return res.json({
        success: false,
        error: {
            msg: err.message
        }
    });

}