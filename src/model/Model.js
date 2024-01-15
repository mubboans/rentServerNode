const mongoose = require('mongoose');
const schema = mongoose.Schema

const CreateModel = (ModelName, fieldObjs) => {
    const model = new schema(
        fieldObjs,
        { timestamps: true }
    );
    return mongoose.model(`${ModelName}`, model)
}

//  {
module.exports = { CreateModel, schema }
//     mongoose
// }