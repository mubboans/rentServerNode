const jwt = require("jsonwebtoken");
const apiErrorHandlerClass = require("../error/errorHandler");
const CustomError = require("../error/customErrorClass");

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
    try {
        let k = jwt.verify(token, process.env.JWT_SECRET);
        console.log(k, 'k check');
        return k;
    } catch (error) {
        throw new Error(error)
    }
}



const ValidateRequestWihToken = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }
    console.log(token, 'bearer token');
    if (!token) {
        return next(apiErrorHandlerClass.Unauthorized("Please Provide Token"));
    }
    // try{ 
    console.log('entered token check');
    try {
        const head = await isTokenValid(token);
        if (head.user) {
            req.user = head.user;
            console.log(req.user);
            next();
        }
        else {
            return next(apiErrorHandlerClass.Unauthorized("Token is invalid"));
        }

    } catch (error) {
        return next(apiErrorHandlerClass.Unauthorized("Token is invalid"));
    }

    //     }
    // catch(error){
    //     return next(apiErrorHandlerClass.Unauthorized("Failed to authenticate"));

    // }   
}
const attachedTokens = (user) => {
    const onehalfDay = '6h';
    const longerExp = '30h';
    console.log(user, 'user to token');
    const accessTokenJWT = createToken({ payload: { user }, expiration: onehalfDay });
    const refreshTokenJWT = createReferesh({ payload: { user }, expiration: longerExp });
    let data = {
        accessToken: accessTokenJWT,
        refreshToken: refreshTokenJWT,
    }
    console.log(data, 'token data');
    return data
}

const TenantTokenValid = (token) => {
    try {
        let k = jwt.verify(token, process.env.JWT_SECRET_TENANT);
        return k;
    } catch (error) {
        throw new CustomError("Please Try Again Token Expire", 401);
    }
}

const CreateTenantToken = (detail) => {
    const twoHour = '2h';
    const token = jwt.sign({ detail }, process.env.JWT_SECRET_TENANT, {
        expiresIn: twoHour,
    });
    return token;
}

module.exports = {
    createToken,
    createReferesh,
    attachedTokens,
    isTokenValid,
    ValidateRequestWihToken,
    TenantTokenValid,
    CreateTenantToken
}