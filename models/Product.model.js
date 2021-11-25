const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    image: String,
    title: String,    
    description: String,
    user_id: { 
        type: Schema.Types.ObjectId,  
        ref: 'User'
    },
    pricePolicy: {
        type: String,
        enum: ['FixedPrice', 'Voluntary'] 
    },
    price: Number,    
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    charity_id: {
        type: Schema.Types.ObjectId,
        ref: 'Charity'
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
},{
    timestamps: true,
})

const Product = model("Product", productSchema);

module.exports = Product;