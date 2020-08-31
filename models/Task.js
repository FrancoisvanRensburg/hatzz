const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    column: { type: Schema.Types.ObjectId, ref: 'Column', required: true },
    taskname: { type: String, required: true, max: 32, trim: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: 'created', updatedAt: 'updated' } }
);

module.exports = mongoose.model('Task', taskSchema);
