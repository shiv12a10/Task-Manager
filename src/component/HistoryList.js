import React from 'react';
// import './HistoryList.css'; 

function HistoryList({ history, deleteHistoryTask }) {
  return (
    <div>
      <h2>History</h2>
      <ul>
        {history.map(task => (
          <li key={task.id} className="history-item">
            <span className="history-text">{task.text}</span>
            <span className="task-time">Completed at: {task.alarmTime}</span>
            <button className="delete-btn" onClick={() => deleteHistoryTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;
