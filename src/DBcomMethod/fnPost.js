import apiErrorHandlerClass from "../error/errorHandler";

const fnPost = async (model, obj) => {
    try {
        let data = await model.create(obj);
        console.log('data created');
        return data;
    }
    catch (e) {
        return apiErrorHandlerClass.BadRequest(e?.message);
    }
}
module.exports = addRecord