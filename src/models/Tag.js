const { Schema, Types } = require('mongoose');

const tagSchema =  {
  tagId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  tagBody: {
    type: String,
    required: true,
    maxlength: 25,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
} 
const schema = new Schema(tagSchema,
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = schema;
