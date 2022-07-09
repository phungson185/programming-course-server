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
  },
  {
    timestamps: true,
  }
);

lessonSchema.plugin(toJSON);

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;