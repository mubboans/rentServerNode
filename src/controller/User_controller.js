const apiErrorHandlerClass = require("../error/errorHandler");
const returnResponse = require("../utils/returnResponse");
const fnPost = require("../DBcomMethod/fnPost");
const fnGetAll = require("../DBcomMethod/fnGetAll");
const User = require("../model/User");
const fnUpdate = require("../DBcomMethod/fnUpdate");
const createMailgenBody = require("../utils/createMailTemplate");
const createMail = require("../utils/sendMail");
const fnDelete = require("../DBcomMethod/fnDelete");
const { TryCatch, GetMomentCurrentDate } = require("../utils/FunctionHelper");


const getUserDetail = TryCatch(async (req, res, next) => {
    const UserData = await fnGetAll(User, req.query, {});
    return returnResponse(res, 200, "Fetch User Detail", UserData,);
})

const getUserStatus = TryCatch(async (req, res, next) => {
    await fnGetAll(User, req.query, {});
    return returnResponse(res, 200, "Fetch User Status");
})

const postUser = TryCatch(async (req, res, next) => {
    const PostedData = fnPost(User, req.body);
    let { name } = req.query;
    let token = CreateTenantToken({ _id: PostedData._id, email: PostedData.email })
    let mailbody = createMailgenBody({
        body: {
            // title: 'Welcome to ApnaRent!',
            title: `Welcome ${body.name} You Have Been Added As a Tenant By ${name}`,
            name: body.name,
            intro: ['Welcome to ApnaRent!', 'We\'re very excited to move forward with you.'],
            action: {
                instructions: 'Please Click Below Button To Configure Your Account',
                button: {
                    color: '#9DBC98',
                    text: 'Confirm your account',
                    link: `${process.env.FRONT_URL}/tenantsignup?token=${token}`
                }
            },
            outro: [' We thank you for choosing us. Need help, or have questions?', 'Just reply to this email, we\'d love to help.'],
        },
    })

    await createMail(mailbody, body.email, "Membership Created");
    return returnResponse(res, 201, "Create New User");
})

const updateUser = TryCatch(async (req, res, next) => {
    let { _id } = req.query;
    if (!_id) {
        return next(apiErrorHandlerClass.BadRequest('Id is required'));
    }
    delete req.body.role;
    const updateData = await fnUpdate(User, req.body, { _id });
    return returnResponse(res, 200, "Updated User");
})
const deleteUser = TryCatch(async (req, res, next) => {
    const deleteData = await fnDelete(User, req.query);
    return returnResponse(res, 200, "Deleted User");
})
const sendMail = TryCatch(async (req, res, next) => {
    let body = req.body;
    let emailed = req?.query?.emailed ?? 'maenterprises.bz@gmail.com'
    let date = GetMomentCurrentDate();
    let mailbody = createMailgenBody({
        body: {
            title: `Form Submited ! ${body.firstName}-${body.lastName} on ${date}`,
            name: `Following detail ${body.email}-${body.contact}`,
            intro: [`Query register ${body.query}`],
            outro: [' We thank you for choosing us.', 'Please reply in case of help your feedback matters'],
        },
    })
    console.log(emailed, 'test the function')
    await createMail(mailbody, emailed, "MA Enterprises contact form submit");
    return returnResponse(res, 200, "Detail Send");
})

module.exports = {
    getUserDetail,
    getUserStatus,
    updateUser,
    deleteUser,
    postUser,
    sendMail
}