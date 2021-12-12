const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
      max: 150,
      validate: {
          validator: v => v % 2 === 0,   //Made it even for the case of this tutorial
          message: props => `${props.value} is not an even number`
    }
  },
  email: {
    type: String,
      minlength: 10,
    maxlength: 100,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(), //Newest date every single time
    immutable: true, //You'll never change your createdAt
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(), //Newest date every single time
  },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId, //Indicates it's a user in our DB
        ref: "User" //Referencing the User model, it tells mongoose what model the ID references
    },
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`Hi my name is ${this.name}`);
}

userSchema.statics.findByName = function (name) {
  return this.find({name: new RegExp(name, "i")})   //Static method
}

userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") }); //Query method
};

userSchema.virtual('namedEmail').get(function () {
  return `${this.name} <${this.email}>`
})

//                            Middleware
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

userSchema.post('save', function (doc, next) {
  doc.sayHi
  next()
})

module.exports = mongoose.model("User", userSchema);
