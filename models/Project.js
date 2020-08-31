const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectname: { type: String, required: true, max: 32, trim: true },
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('Project', projectSchema);
