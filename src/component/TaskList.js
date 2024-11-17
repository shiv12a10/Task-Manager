import React, { useState } from 'react';
import './TaskList.css';

function TaskList({ tasks, completeTask, editTask, deleteTask }) {
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <ul>
        {[...tasks].reverse().map(task => (
          <li key={task.id} className="task-item">
            <CollapsibleTask
              task={task}
              editTask={editTask}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CollapsibleTask({ task, editTask, completeTask, deleteTask }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`collapsible-task ${isOpen ? 'open' : ''}`}>
      <div className="task-header" onClick={toggleOpen}>
        <span className="task-title">
          {task.text.length > 50 ? `${task.text.slice(0, 50)}...` : task.text}
        </span>
        <button className="toggle-btn">{isOpen ? 'Close' : 'Open'}</button>
      </div>
      {isOpen && (
        <div className="task-details">
          <span
            className="task-full-text"
            contentEditable
            suppressContentEditableWarning
            onBlur={e => editTask(task.id, e.target.textContent.trim())}
          >
            {task.text}
          </span>
          <button className="task-priority-btn">Priority: {task.priority}</button>
          <button className="complete-btn" onClick={() => completeTask(task.id)}>
            Complete
          </button>
          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
