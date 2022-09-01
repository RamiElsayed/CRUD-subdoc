const { Schema, model } = require('mongoose');
const Tag = require('./Tag');

// Schema to create Post model
const applicationSchema = {
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  buildSuccess: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    minLength: 15,
    maxLength: 500,
  },
  tags: [Tag],
}
const schema = new Schema(applicationSchema,
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

schema
  .virtual('tagsCount').get(function () {
    return this.tags.length;
  });

const Application = model('application', schema);

module.exports = Application;
