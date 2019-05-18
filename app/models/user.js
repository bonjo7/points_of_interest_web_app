'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

userSchema.methods.comparePassword = async function(candidatePassword)
{
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

userSchema.statics.deleteUserById = function(id){

    console.log('Selected User with id: ' + id);

    if (id.match(/^[0-9a-fA-F]{24}$/)) {

        this.findOneAndDelete({_id: id}, function (err) {

                if (err)
                    console.log(err);
                else
                    console.log('Deleting User with id: ' + id)

            }
        )
    }
    else
        console.log('Can not find matching id with correct syntax')

};


module.exports = Mongoose.model('User', userSchema);