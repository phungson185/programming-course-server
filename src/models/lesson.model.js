const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const lessonSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    video: {
      type: String,
      required: true,
      trim: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    quiz: {
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
    }
  },
  {
    timestamps: true,
  }
);

lessonSchema.plugin(toJSON);

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;