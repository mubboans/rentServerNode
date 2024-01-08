const responseCookie = (res, data, expiry) => {
    console.log(expiry, 'epiry check');
    res.cookie("login", data, { expires: expiry, httpOnly: true })
}
module.exports = responseCookie;