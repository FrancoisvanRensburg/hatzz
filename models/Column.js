const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const columnSchema = new Schema({
  title: { type: String, trim: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('Column', columnSchema);
