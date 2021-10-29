const express = require('express');
const actionsModel = require('./actions-model');
const middleware = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res) => {
  actionsModel.get()
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({message:"error getting actions", error:err}));
});
router.get('/:id', middleware.verifyActionId, (req, res) => {
  res.status(200).json(req.action);
});
router.post('/', middleware.verifyAction, (req, res) => {
  actionsModel.insert(req.action)
    .then(action => res.status(201).json(action))
    .catch(err => res.status(500).json({message:"error posting action", error:err}));
});
router.put('/:id', middleware.verifyActionId, middleware.verifyAction, (req, res) => {
  actionsModel.update(req.params.id, req.action)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({message:"error updating action", error:err}));
});
router.delete('/:id', middleware.verifyActionId, (req, res) => {
  actionsModel.remove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).json({message:"error deleting action", error:err}));
});

module.exports = router;