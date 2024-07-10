const taskModel = require('../models/task.model');
module.exports = {
    async create(req, res){
        const task = new taskModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            user: req.user._id
        });
        task.save()
            .then(() => res.status(201).send('Task created.'))
            .catch(err => res.status(500).send('Error creating task.'));
    },
    async read(req, res){
        const tasks = await taskModel.find({ user: req.user._id });
        res.status(200).send(tasks);
    },
    async update(req, res){
        const task = await taskModel.findOne({ _id: req.params.id });
        if (!task) return res.status(404).send('Task not found.');
        task.title = req.body.title;
        task.description = req.body.description;
        task.completed = req.body.completed;
        task.category = req.body.category;
        task.save()
            .then(() => res.status(200).send('Task updated.'))
            .catch(err => res.status(500).send('Error updating task.'));
    },
    async delete(req, res){
        const task = await taskModel.findOne({ _id: req.params.id });
        if (!task) return res.status(404).send('Task not found.');
        task.delete()
            .then(() => res.status(200).send('Task deleted.'))
            .catch(err => res.status(500).send('Error deleting task.'));
    }
}