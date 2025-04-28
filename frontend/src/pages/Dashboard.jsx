import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {Delete, Pencil, Search } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Dashboard = () => {
  const [showInput, setShowInput] = useState(false);
  const [todos, setTodos] = useState([]); 
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignedTo, setTaskAssignedTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');

  // Filter tasks based on search query
  const filterTasks = (tasks) => {
    if (!searchQuery) return tasks;
    const query = searchQuery.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.assignedTo.toLowerCase().includes(query)
    );
  };

  const filteredTodos = filterTasks(todos);
  const filteredPendingTasks = filterTasks(pendingTasks);
  const filteredCompletedTasks = filterTasks(completedTasks);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditAssignedTo(task.assignedTo);
  };
  
  const handleEditSave = async () => {
    if (!editingTask) return;
  
    try {
      const response = await axios.put(
        `http://localhost:8000/api/task/update/${editingTask._id}`,
        {
          title: editTitle,
          description: editDescription,
          assignedTo: editAssignedTo,
          status: editingTask.status
        }
      );
  
      if (response.status === 200) {
        toast.success('Task updated successfully!');
        fetchTasks();
        setEditingTask(null);
      } else {
        toast.error('Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Something went wrong while updating the task.');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/task/all');
      const allTasks = response.data.tasks;
  
      const pending = allTasks.filter(task => task.status === 'pending');
      const completed = allTasks.filter(task => task.status === 'completed');
      const todos = allTasks.filter(task => task.status === 'todo');
  
      setPendingTasks(pending);
      setCompletedTasks(completed);
      setTodos(todos)
      console.log("🚀 ~ fetchTasks ~ todos:", todos)
      
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleTaskSave = async () => {
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '' && taskAssignedTo.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/api/task/add', {
          title: taskTitle,
          description: taskDescription,
          assignedTo: taskAssignedTo,
          status: 'todo',
        });
  
        if (response.status === 201 || response.status === 200) {
          toast.success(response.data.message);
          fetchTasks();
        } else {
          toast.error('Failed to add task. Please try again.');
        }
  
        setShowInput(false);
        setTaskTitle('');
        setTaskDescription('');
        setTaskAssignedTo('');
      } catch (error) {
        toast.error('Something went wrong while saving the task.');
        console.error('Save Task Error:', error);
      }
    } else {
      toast.error('Please fill all fields before saving.');
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    console.log("🚀 ~ handleDeleteTask ~ taskId:", taskId)
    try {
      const response = await axios.delete(`http://localhost:8000/api/task/delete/${taskId}`); 
      if (response.status === 200) {
        toast.success('Task deleted successfully!');
        fetchTasks(); 
      } else {
        toast.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Something went wrong!');
    }
  };
  

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;
  
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return; 
    }
  
    let sourceList = source.droppableId === 'todo' ? [...todos] : source.droppableId === 'pending' ? [...pendingTasks] : [...completedTasks];
    let destinationList = destination.droppableId === 'todo' ? [...todos] : destination.droppableId === 'pending' ? [...pendingTasks] : [...completedTasks];
  
    const [movedTask] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedTask);
  
    if (source.droppableId === 'todo' && destination.droppableId === 'pending') {
      setTodos(sourceList);
      setPendingTasks(destinationList);
    } else if (source.droppableId === 'pending' && destination.droppableId === 'todo') {
      setPendingTasks(sourceList);
      setTodos(destinationList);
    } else if (source.droppableId === 'pending' && destination.droppableId === 'completed') {
      setPendingTasks(sourceList);
      setCompletedTasks(destinationList);
    } else if (source.droppableId === 'completed' && destination.droppableId === 'pending') {
      setCompletedTasks(sourceList);
      setPendingTasks(destinationList);
    } else if (source.droppableId === 'todo' && destination.droppableId === 'completed') {
      setTodos(sourceList);
      setCompletedTasks(destinationList);
    } else if (source.droppableId === 'completed' && destination.droppableId === 'todo') {
      setCompletedTasks(sourceList);
      setTodos(destinationList);
    }
  
    try {
      
      const updatedStatus = destination.droppableId;
      console.log("movedTask._id", movedTask._id);
      console.log("🚀 ~ handleDragEnd ~ updatedStatus:", updatedStatus)


      const response = await axios.put(`http://localhost:8000/api/task/update/${movedTask._id}`, {
        status: updatedStatus, 
      });
      fetchTasks()
      if (response.status === 200) {
        toast.success('Task status updated!');
      } else {
        toast.error('Failed to update task status.');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Something went wrong while updating the task status.');
    }
  };
  

  return (
        <div className="min-h-screen bg-gradient-to-r p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-[#4e342e] mb-2">Dashboard</h1>
            <p className="text-[#5d4037] md:text-sm font-medium mx-auto">Manage tasks, track progress, and collaborate with your team — all in one powerful dashboard built for your success.</p>
            
            {/* Search Bar */}
            <div className="relative mt-6 mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks by title, description, or assignee..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:border-transparent"
              />
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex md:flex-row mt-10 flex-col gap-6">

              <Droppable droppableId="todo">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition bg-gradient-to-r from-[#d7ccc8] to-[#efebe9]"
                  >
                    <h2 className="text-2xl font-bold text-[#6d4c41] mb-2">Todo tasks</h2>
                    <p className="text-gray-600 mb-4">Check all your assigned tasks and deadlines.</p>
                    {filteredTodos.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`relative p-4 my-3 rounded-lg cursor-move transition-all duration-200 ${
                              snapshot.isDragging ? 'bg-indigo-50 shadow-lg' : 'bg-white shadow-md'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-gray-800 text-lg">{task.title}</h3>
                              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">{task.status}</span>
                            </div>
                            
                            {task.description && (
                              <p className="mt-2 text-gray-600">{task.description}</p>
                            )}
                            
                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500">Assigned to:</span>
                                <span className="ml-1 text-sm font-medium text-indigo-600">{task.assignedTo}</span>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button className="p-1 text-gray-400 hover:text-indigo-500 transition-colors">
                                 <Pencil/>
                                </button>
                                <button onClick={()=> handleDeleteTask(task._id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                <Delete />
                                </button>
                              </div>
                            </div>
                            
                            <div className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-all duration-200 ${
                              snapshot.isDragging ? 'border-indigo-300' : 'border-transparent'
                            }`}
                            ></div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {!showInput && (
                    <button onClick={handleAddClick} className="bg-[#6d4c41] text-white py-2 px-4 rounded-lg hover:bg-[#5d4037] transition">Add Task</button>
                  )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>


              {/* Pending Tasks */}
              <Droppable droppableId="pending">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition bg-gradient-to-r from-[#d7ccc8] to-[#efebe9]"
                  >
                    <h2 className="text-2xl font-bold text-[#6d4c41] mb-2">Pending tasks</h2>
                    <p className="text-gray-600 mb-4">Check all your assigned tasks and deadlines.</p>
                    {filteredPendingTasks.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`relative p-4 my-3 rounded-lg cursor-move transition-all duration-200 ${
                              snapshot.isDragging ? 'bg-indigo-50 shadow-lg' : 'bg-white shadow-md'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-gray-800 text-lg">{task.title}</h3>
                              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">{task.status}</span>
                            </div>
                            
                            {task.description && (
                              <p className="mt-2 text-gray-600">{task.description}</p>
                            )}
                            
                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500">Assigned to:</span>
                                <span className="ml-1 text-sm font-medium text-indigo-600">{task.assignedTo}</span>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button onClick={() => handleEditClick(task)}  className="p-1 text-gray-400 hover:text-indigo-500 transition-colors">
                                 <Pencil/>
                                </button>
                                <button onClick={()=> handleDeleteTask(task._id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                <Delete />
                                </button>
                              </div>
                            </div>
                            
                            <div className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-all duration-200 ${
                              snapshot.isDragging ? 'border-indigo-300' : 'border-transparent'
                            }`}
                            ></div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Completed Tasks */}
              <Droppable droppableId="completed">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition bg-gradient-to-r from-[#d7ccc8] to-[#efebe9]"
                  >
                    <h2 className="text-2xl font-bold text-[#6d4c41] mb-2">Completed Tasks</h2>
                    <p className="text-gray-600 mb-4">Check all your assigned tasks and deadlines.</p>
                    {filteredCompletedTasks.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`relative p-4 my-3 rounded-lg cursor-move transition-all duration-200 ${
                              snapshot.isDragging ? 'bg-indigo-50 shadow-lg' : 'bg-white shadow-md'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-gray-800 text-lg">{task.title}</h3>
                              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">{task.status}</span>
                            </div>
                            
                            {task.description && (
                              <p className="mt-2 text-gray-600">{task.description}</p>
                            )}
                            
                            <div className="mt-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500">Assigned to:</span>
                                <span className="ml-1 text-sm font-medium text-indigo-600">{task.assignedTo}</span>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button className="p-1 text-gray-400 hover:text-indigo-500 transition-colors">
                                 <Pencil/>
                                </button>
                              </div>
                            </div>
                            
                            <div className={`absolute inset-0 rounded-lg border-2 pointer-events-none transition-all duration-200 ${
                              snapshot.isDragging ? 'border-indigo-300' : 'border-transparent'
                            }`}
                            ></div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
          </DragDropContext>

          {showInput && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl z-50 w-[500px] max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-center text-[#6d4c41]">Create New Task</h2>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
                />
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Enter task description..."
                  rows="4"
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
                ></textarea>

                <input
                  type="text"
                  value={taskAssignedTo}
                  onChange={(e) => setTaskAssignedTo(e.target.value)}
                  placeholder="Assign to (name or email)..."
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleTaskSave}
                    className="bg-[#6d4c41] text-white py-2 px-5 rounded-lg hover:bg-[#5d4037] transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowInput(false);
                      setTaskTitle('');
                      setTaskDescription('');
                      setTaskAssignedTo('');
                    }}
                    className="bg-gray-300 text-[#5d4037] py-2 px-5 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}

          {editingTask && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl z-50 w-[500px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center text-[#6d4c41]">Edit Task</h2>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Task description"
                    rows="4"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
                  ></textarea>
                  <input
                    type="text"
                    value={editAssignedTo}
                    onChange={(e) => setEditAssignedTo(e.target.value)}
                    placeholder="Assign to"
                    className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d4c41]"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleEditSave}
                      className="bg-[#6d4c41] text-white py-2 px-5 rounded-lg hover:bg-[#5d4037] transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="bg-gray-300 text-[#5d4037] py-2 px-5 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          </div>
        </div>
      );
}

export default Dashboard
