'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const poiSchema = new Schema({
    attractionType: String,
    attractionName: String,
    description: String,
    latitude: Number,
    longitude: Number,
    poi: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    admission:{
        type: Schema.Types.ObjectId,
        ref: 'Admission'
    }

});


poiSchema.statics.deleteById = function(id){

    console.log('Selected POI with id: ' + id);

    //Ensure the id matches the correct synatax
    if (id.match(/^[0-9a-fA-F]{24}$/)) {

        //delete the poi that matches the correct object id
        this.findOneAndDelete({_id: id}, function (err) {

            if (err)
                console.log(err);
            else
                console.log('Deleting poi with id: ' + id)

        }
        )
    }
    else
        console.log('Can not find matching id with correct syntax')

};

module.exports = Mongoose.model('Points_of_Interest', poiSchema);