const mongoose = require('mongoose')
const pitch = new mongoose.Schema({
      id: {
        type: String,
        required: true
      },
      entrepreneur:
      { 
        type: String,
        required: true 
      },
      pitchTitle: 
      { 
        type: String, 
        required: true 
      },
      pitchIdea: {
        type: String,
        required: true
      },
      askAmount: {
        type: Number,
        required: true
      },
      equity:
      { 
        type: Number,
        required: true
      },
      offers: 
      [
        {
          _id : false,
          id: {
            type: String,
            required: true
          },
          investor: {
            type: String,
            required: true
          },
          amount: {
            type: Number,
            required: true
          },
          equity: {
            type: Number,
            required: true
          },
          comment: {
            type: String,
            required: true
          }
        }
      ]
})

mongoose.model("Pitch", pitch)