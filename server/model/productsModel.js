const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'Please add a category'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image'],
    },
    quantity: {
        type: Number,
        required: [false],
    },
},
{
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Product', productSchema);
