const express = require('express');
const router = express.Router();

const { addTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

router.post('/add', addTask);
router.get('/all', getTasks);       
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;
