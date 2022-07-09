const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const quizSchema = mongoose.Schema(
  {
    data: {
      title: {
        type: String,
        required: true,
      },
      questions: [
        {
          question: {
            type: String,
            required: true,
          },
          answers: {
            A: {
              type: String,
              required: true,
            },
            B: {
              type: String,
              required: true,
            },
            C: {
              type: String,
              required: true,
            },
            D: {
              type: String,
              required: true,
            },
          },
          correctAnswer: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

quizSchema.plugin(toJSON);

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
