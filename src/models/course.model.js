const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const courseSchema = mongoose.Schema(
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
    image: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    lessons: [
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
      },
    ],
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
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.plugin(toJSON);
courseSchema.plugin(paginate);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
