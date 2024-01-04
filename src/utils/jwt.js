const jwt = require("jsonwebtoken");

const createToken = ({ payload, expiration }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiration,
    });
    return token;
}

const createReferesh = ({ payload, expiration }) => {
    const refereshtoken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: expiration,
    });
    return refereshtoken;
}

const isTokenValid = (token) => {
    let k = jwt.verify(token, process.env.JWT_SECRET);
    return k;
}

const attachedTokens = ({ user }) => {
    const onehalfDay = '6h';
    const longerExp = '30h';

    const accessTokenJWT = createToken({ payload: { user }, expiration: onehalfDay });
    const refreshTokenJWT = createReferesh({ payload: { user }, expiration: longerExp });
    let data = {
        accessToken: accessTokenJWT,
        refreshToken: refreshTokenJWT,
    }
    console.log(data, 'token data');
    return data
}

module.exports = {
    createToken,
    createReferesh,
    attachedTokens,
    isTokenValid
}