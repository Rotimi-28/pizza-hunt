const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: true
    },
    writtenBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

//To get virtuals commentsCounts.
  CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });  

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
