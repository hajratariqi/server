const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  status: String,
  // dueDate: Date,
  createdBy: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Task', TaskSchema);
