const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
    eventImage: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCthRyJ1Sh4X8HyhnyiqJLBxsULXwuz3TaRg&usqp=CAU'
    }, 
    title: String,
    //this is for selecting the hobby to which is related the event
    hobby_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hobby'
    },
    description: String,
    equipment: String,
    date: Date,
    //this is to show the users attending to the event
    user_id: { 
        type: Schema.Types.ObjectId,  
        ref: 'User'
    },
    attendees: [{ 
        type: Schema.Types.ObjectId,  
        ref: 'User'
    }],
    attendees_max: {
        type: Number,
        min: 1,
    },
    attendees_min: {
        type: Number,
        min: 0,
    },
    pricePolicy: {
        type: String,
        enum: ['FixedPrice', 'Free', 'Voluntary'] 
    },
    price: {
        type: Number
    },
  // location:, // coordinates, //mapbox
    organizedBy: {
        type: String,
        enum: ['Charity', 'Company', 'User']
        // Charity is for charity companies
        // Private is for companies that want to offer an activity and donate the benefits to a cause
        // Personal is for people who wants to offer an activity and donate the benefits to a cause
    },
    //this is for a dropdown to select the charity the event organizer wants to donate the money
    charity_id:{
        type: Schema.Types.ObjectId,
        ref: 'Charity'
    },
    //this is for showing the opinions about the event
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
},{
    timestamps: true,
});

const Event = model("Event", eventSchema);

module.exports = Event;
