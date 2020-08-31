const Project = require('../models/Project');
const Column = require('../models/Column');
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { taskname, column, project } = req.body;
  const taskFields = {};
  if (taskname) taskFields.taskname = taskname;
  if (column) taskFields.column = column;
  if (project) taskFields.project = project;

  try {
    const task = new Task(taskFields);

    // find column id
    const newColumn = await Column.findOne({ _id: column });

    // find project id - will see if this is neccesary
    const newProject = await Project.findOne({ _id: project });

    await task.save();

    // clone current array and add new task to array
    newColumn.tasks = [...newColumn.tasks, task._id];
    newProject.tasks = [...newProject.tasks, task._id];

    await newColumn.save();
    await newProject.save();

    res.json(task);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

exports.moveTask = async (req, res) => {
  const { previousColumn, movingColumn, movingTask, project } = req.body;
  try {
    const thisTask = await Task.findOne({ _id: movingTask });
    const oldColumn = await Column.findOne({ _id: previousColumn });
    const newColumn = await Column.findOne({ _id: movingColumn });

    oldColumn.tasks.pull({ _id: thisTask._id });
    await oldColumn.save();
    newColumn.tasks = [...newColumn.tasks, thisTask._id];
    await newColumn.save();

    const curProject = await Project.findOne({ _id: project })
      .select('_id projectname columns')
      .populate({
        path: 'columns',
        select: 'tasks title',
        populate: { path: 'tasks', select: '_id taskname' },
      });
    console.log(curProject);
    res.json(curProject);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};
