const TodoItem = require('../models/todoItem')

const all = async (req, res) => {
    const todoItems = await TodoItem.all();

    res.json(todoItems)
}

const create = async (req, res) => {
    const todoItem = new TodoItem(req.body.content, req.body.status, req.body.date);
    await todoItem.save();

    res.status(201).json(todoItem)
}

const show = async (req, res) => {
    const todoItem = await TodoItem.getById(req.params.id);

    if (!todoItem) {
        res.status(404).json(null);
        return;
    }

    res.json(todoItem);
}

const update = async (req, res) => {
    const todoItem = await TodoItem.getById(req.params.id);

    if (!todoItem) {
        res.status(404).json(null);
        return;
    }

    await todoItem.update(req.body);

    res.json(todoItem);
}

const destroy = async (req, res) => {
    const todoItem = await TodoItem.getById(req.params.id);

    if (!todoItem) {
        res.status(404).json(null);
        return;
    }

    await todoItem.destroy();

    res.status(204).send();
}

const toggleDone = async (req, res) => {
    const todoItem = await TodoItem.getById(req.params.id);

    if (!todoItem) {
        res.status(404).json(null);
        return;
    }

    await todoItem.toggleDone();

    res.json(todoItem);
}

module.exports = { all, create, show, update, destroy, toggleDone }
