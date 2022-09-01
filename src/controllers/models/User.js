const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = {
  first: String,
  last: String,
  age: Number,
  applications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Application',
    },
  ],
}
const schema = new Schema (userSchema,
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

schema
  .virtual('fullName')
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

const User = model('User', schema);

module.exports = User;
