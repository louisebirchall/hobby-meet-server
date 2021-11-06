const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    title: String,
    productImage: String,
    description: String,
    pricePolicy: {
        type: String,
        enum: ['FixedPrice', 'Voluntary'] 
    },
    price: Number,
    createdBy_id: { 
        type: Schema.Types.ObjectId,  
        ref: 'User'
    },
    hobbyRelated_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hobby'
    },
    charity_id:{
        type: Schema.Types.ObjectId,
        ref: 'Charity'
    },
    review_id:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
},{
    timestamps: true,
})

const Product = model("Product", productSchema);

module.exports = Product;