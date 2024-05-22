import React from "react";
import { useState } from "react";
import TaskService from "../services/TaskService";

export const AddTaskComponent = () => {
  const [task, setTask] = useState([]);

  const saveTask = (e) => {
    e.preventDefault();
    const taskName = { 'title': task };
    TaskService.createTask(taskName)
      .then((response) => {
        updateTaskList(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const updateTaskList = ( newTask ) => {
    const event = new CustomEvent('taskAdded', { detail: newTask });
    document.dispatchEvent(event);
  }

  return (
    <div>
      <div className="container">
        <div className="form">
          <form>
            <div className="form-group">
              <label className="task-label">Task</label>
              <input
                type="text"
                placeholder="add your task"
                className="from-control"
                id="value"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button className="save-btn" onClick={saveTask}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskComponent;
