const taskModel = require('../models/task.model');
const categoryModel = require('../models/category.model');
module.exports = {
    async create(req, res) {
        try {
            const task = new taskModel({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                user: req.user._id
            });
            await task.save();

            const category = await categoryModel.findByIdAndUpdate(
                req.body.category,
                { $push: { tasks: task._id } },
                { new: true, useFindAndModify: false }
            );

            if (!category) {
                return res.status(404).send('Category not found.');
            }

            res.status(201).send(task);
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).send('Error creating task.');
        }
    },
    async read(req, res){
        const tasks = await taskModel.find({ user: req.user._id });
        res.status(200).send(tasks);
    },
    async update(req, res){
        const task = await taskModel.findOne({ _id: req.params.id });
        if (!task) return res.status(404).send('Task not found.');
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;
        task.category = req.body.category || task.category;
        task.save()
            .then(() => res.status(200).send('Task updated.'))
            .catch(err => res.status(500).send('Error updating task.'));
    },
    async delete(req, res) {
        const task = await taskModel.findOne({ _id: req.params.id });
        if (!task) return res.status(404).send('Task not found.');
        await task.remove()
            .then(async () => {
                // Remove task reference from the category
                await categoryModel.findByIdAndUpdate(task.category, { $pull: { tasks: task._id } });
                res.status(200).send('Task deleted.');
            })
            .catch(err => res.status(500).send('Error deleting task.'));
    }
}