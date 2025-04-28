const Task = require('../models/Task');
 
  exports.addTask = async (req, res) => {
    console.log("🚀 ~ exports.addTask= ~ req.body:", req.body)
    try{
      const { title, status , description, assignedTo} = req.body;

      const newTask = new Task({ title, status, description, assignedTo });
      await newTask.save();
      res.status(201).json({ message: 'Task created successfully', task: newTask });
    }catch(error){
      res.status(500).json({error: error.message})
    }
  };
  
  exports.getTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  // exports.updateTask = async (req, res) => {
  //   console.log("🚀 ~ exports.updateTask= ~ req:", req)
  //   try {
  //     const { id } = req.params;
  //     const { title, status } = req.body; 
  //     const updatedTask = await Task.findByIdAndUpdate(id, { title, status }, { new: true });
  //     res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };

  // exports.updateTask = async (req, res) => {
  //   console.log("🚀 ~ exports.updateTask= ~ req:", req);
  //   try {
  //     const { id } = req.params;
  //     const { title, status } = req.body; 
  //     const updatedTask = await Task.findByIdAndUpdate(id, { title, status }, { new: true });
  //     res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };
  

  exports.updateTask = async (req, res) => {
    console.log("🚀 ~ Task ID from params:", req.params.id);
    console.log("🚀 ~ Task data from body:", req.body);
  
    try {
      const { id } = req.params;
      const { status, title } = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(id, { title, status }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.deleteTask = async (req, res) => {
    console.log("🚀 ~ exports.deleteTask ~ req:", req)
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };