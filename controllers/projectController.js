const Project = require('../models/Project');
const Column = require('../models/Column');
const Task = require('../models/Task');

// Create Project
exports.createProject = async (req, res) => {
  const { projectname } = req.body;

  const projectFields = {};
  if (projectname) projectFields.projectname = projectname;

  try {
    const project = new Project(projectFields);

    const col1Fields = {
      title: 'To do',
      project: project._id,
    };
    const col1 = new Column(col1Fields);

    col1.save();
    project.columns.push(col1);

    const col2Fields = {
      title: 'In Progress',
      project: project._id,
    };
    const col2 = new Column(col2Fields);

    col2.save();
    project.columns.push(col2);

    const col3Fields = {
      title: 'Completed',
      project: project._id,
    };
    const col3 = new Column(col3Fields);

    col3.save();
    project.columns.push(col3);

    await project.save();

    res.json(project);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId })
      .select('_id projectname columns')
      .populate({
        path: 'columns',
        select: 'tasks title',
        populate: { path: 'tasks', select: '_id taskname' },
      });

    res.json(project);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

exports.getProjectColumns = async (req, res) => {
  try {
    const columns = await Project.findOne({
      _id: req.params.projectId,
    }).populate({
      path: 'columns',
      select: 'title tasks',
      populate: { path: 'tasks', select: '_id taskname' },
    });

    const colArrToObj = (array, keyField) =>
      array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
      }, {});

    const columnObject = colArrToObj(columns.columns, '_id');

    res.json(columnObject);
    // res.json(columns.columns);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).select('_id projectname');

    res.json(projects);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};
