const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const attendanceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    achivement: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.plugin(toJSON);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
