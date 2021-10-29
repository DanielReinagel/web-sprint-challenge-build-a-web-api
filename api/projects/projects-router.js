const express = require('express');
const projectsModel = require('./projects-model');
const middleware = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  projectsModel.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({message:"error getting projects", error:err}));
});
router.get('/:id', middleware.verifyProjectId, (req, res) => {
  res.status(200).json(req.project);
});
router.post('/', middleware.verifyProject, (req, res) => {
  projectsModel.insert(req.project)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({message:"error posting project", error:err}));
});
router.put('/:id', middleware.verifyProjectId, middleware.verifyProject, (req, res) => {
  projectsModel.update(req.params.id, req.project)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({message:"error updating project", error:err}));
});
router.delete('/:id', middleware.verifyProjectId, (req, res) => {
  projectsModel.remove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).json({message:"error deleting project", error:err}));
});
router.get('/:id/actions', middleware.verifyProjectId, (req, res) => {
  projectsModel.getProjectActions(req.params.id)
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({message:"error getting project actions", error:err}));
})

module.exports = router;