const CreateModel = require("./Model");


const Category = CreateModel("Category", {
    categoryname: {
        type: String,
        required: [true, "Category Name Required"],
        trim: true,
    }
});
module.exports = Category;