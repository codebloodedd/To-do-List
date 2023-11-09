const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        deadline: {
            type: Date,
            default: null
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("todo", todoSchema);