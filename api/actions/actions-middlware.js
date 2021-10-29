const actionsModel = require('./actions-model');
const projectsModel = require('../projects/projects-model');

const verifyActionId = (req, res, next) => {
  const { id } = req.params;
  actionsModel.get(id)
    .then(action => {
      if(action){
        req.action = action;
        next();
      } else {
        res.status(404).json({message:`Action with id ${id} not found`})
      }
    })
    .catch(err => res.status(500).json({message:"error getting action", error:err}));
}
const verifyAction = (req, res, next) => {
  const { project_id, description, notes, completed } = req.body
  const putCheck = !(req.method==="PUT")||typeof completed === "boolean";
  if(project_id&&description&&notes&&putCheck){
    projectsModel.get(project_id)
      .then(project => {
        if(project){
          if(description.length<=128){
            req.action = {project_id, description, notes, completed: !!completed};
            next();
          } else {
            res.status(400).json({message:"You must provide a description with less than 129 characters"});
          }
        } else {
          res.status(400).json({message:`The project with id ${project_id} does not exist`});
        }
      })
  } else {
    res.status(400).json({message:"You must include a project_id, description, notes, and potentially a completed boolean in your request"});
  }
};

module.exports = {
  verifyActionId,
  verifyAction
};