import configs from "../config/config.js";

export default (user, statusCode, res) => {

    // Create JWT Token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + configs.cookieExpireTime * 24 * 60 * 60 * 1000 // current date * cookieExpire time * (day)
        ),
        httpOnly: true // httpOnly: true means cookie is accessable only from backend
    }

    res.status(statusCode).cookie("token", token, options).json({
        token
    });

};
