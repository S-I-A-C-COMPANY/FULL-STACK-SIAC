const  mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    dni: {
        type: String,
        required: [true, 'Please add a identification'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }, 
    roles: {
        
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        
    },
},
    {
        timestamps: true,
        versionKey: false,
      }
    );

module.exports = mongoose.model('User',userSchema)