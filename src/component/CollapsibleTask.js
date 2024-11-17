import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CollapsibleTask.css';

function CollapsibleTask({ task, completeTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false); // State for viewing details
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDetails, setEditedDetails] = useState(task.details);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleEditSave = () => {
    editTask(task.id, editedTitle, editedDetails, editedPriority);
    setIsEditing(false);
  };

  return (
    <div className="collapsible-task">
      <div className="task-header">
        <div>
          <p className="task-title">
            {task.title}{' '}
            <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
              [{task.priority}]
            </span>
          </p>
        </div>
        <button onClick={() => setIsViewing(true)}>View Details</button>
      </div>

      <div className="task-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => completeTask(task.id)}>Complete</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Task Title"
              className="modal-input"
            />
            <textarea
              value={editedDetails}
              onChange={(e) => setEditedDetails(e.target.value)}
              placeholder="Task Details"
              className="modal-textarea"
            ></textarea>
            <select
              className="modal-select"
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleEditSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewing && (
        <div className="view-modal-overlay">
          <div className="view-modal">
            <div className="head">
              <h3>Task Details</h3>
              <p>
                <strong>Title:</strong> {task.title}
              </p>
              <p>
                <strong>Priority:</strong>{' '}
                <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </p>
            </div>
            <div className="view-modal-content">
              <p>
                <strong>Details:</strong> {task.details}
              </p>
            </div>
            <div className="view-modal-actions">
              <button onClick={() => setIsViewing(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CollapsibleTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
  completeTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default CollapsibleTask;
