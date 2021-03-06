const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({  
  conversationId: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Conversation'
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }
}, {
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});


const Message = mongoose.model('Message', MessageSchema)

module.exports = Message