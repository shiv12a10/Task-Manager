import React, { useState, useEffect } from 'react';
import CollapsibleTask from './component/CollapsibleTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('history', JSON.stringify(history));
  }, [tasks, history]);

  const addTask = () => {
    if (taskTitle.trim() && taskDetails.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        details: taskDetails,
        priority,
      };
      setTasks([...tasks, newTask]);
      resetInputFields();
    }
  };

  const completeTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setHistory([...history, { ...task, completedAt: new Date().toLocaleString() }]);
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteHistoryTask = (id) => {
    setHistory(history.filter((task) => task.id !== id));
  };

  const editTask = (id, newTitle, newDetails, newPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, details: newDetails, priority: newPriority }
          : task
      )
    );
  };

  const resetInputFields = () => {
    setTaskTitle('');
    setTaskDetails('');
    setPriority('Medium');
  };

  const filteredTasks = tasks
    .filter((task) => {
      const titleMatches = task.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const detailsMatches = task.details?.toLowerCase().includes(searchQuery.toLowerCase());
      const priorityMatches = filterPriority === 'All' || task.priority === filterPriority;
      return (titleMatches || detailsMatches) && priorityMatches;
    })
    .sort((a, b) => b.id - a.id);

  return (
    <div className="App">
      <div className="heading">
        <h1>Task Manager</h1>
      </div>

      {/* Task History Button */}
      <button className="history-toggle-btn" onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? 'Close History' : 'Task History'}
      </button>

      {/* Task History Section */}
      {showHistory && (
        <div className="task-history">
          <h2>Task History</h2>
          {history.length > 0 ? (
            history.map((task) => (
              <div key={task.id} className="history-item">
                <p>
                  <strong>{task.title}</strong> - Completed on {task.completedAt}
                </p>
                <button onClick={() => deleteHistoryTask(task.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No completed tasks yet!</p>
          )}
        </div>
      )}

      <div className="App1">
        {/* Task Input Section */}
        <div className="add-task">
          <div className="inputt">
            <div className="title-btn">
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
              />
              <select
                className="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Priority" disabled>
                  Priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <textarea
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              placeholder="Enter task details..."
            ></textarea>
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>

        {/* Task List Section */}
        <div className="taskList">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by title or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="task-list">
            <h2>Tasks</h2>
            {filteredTasks.map((task) => (
              <CollapsibleTask
                key={task.id}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
