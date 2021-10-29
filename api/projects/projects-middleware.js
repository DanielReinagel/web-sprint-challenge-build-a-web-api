const projectsModel = require('./projects-model');

const verifyProject = (req, res, next) => {
  const { name, description, completed } = req.body
  const putCheck = !(req.method==="PUT")||typeof completed === "boolean";
  if(name&&description&&putCheck){
    req.project = {name, description, completed: !!completed};
    next();
  } else {
    res.status(400).json({message:req.method==="PUT" ? "You must include a name, description, and a completed boolean in your put request" : "You must include a name and description in your post request"});
  }
};
const verifyProjectId = (req, res, next) => {
  const { id } = req.params
  projectsModel.get(id)
    .then(project => {
      if(project){
        req.project = project;
        next();
      } else {
        res.status(404).json({message:`Project with id ${id} not found`});
      }
    })
    .catch(err => res.status(500).json({message:"Error getting project", error:err}));
};

module.exports = {
  verifyProject,
  verifyProjectId
};