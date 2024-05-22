import { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import AddTaskComponent from "./AddTaskComponent";
import ModalForm from "./ModalForm";

export const ListTaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    fetchData();
    const handleTaskAdded = (event) => {
      setTasks((prevTasks) => [...prevTasks, event.detail]);
    };

    document.addEventListener("taskAdded", handleTaskAdded);

    return () => {
      document.removeEventListener("taskAdded", handleTaskAdded);
    };
  }, []);

  const fetchData = async () => {
    TaskService.getAllTasks()
    .then((response) => {
      setTasks(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleDelete = (taskId) => {
    TaskService.deleteTask(taskId)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckboxChange = (taskId, completed) => {
    TaskService.updateStatus(taskId, { completed: !completed })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: !completed } : task
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  const handleUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <>
      <AddTaskComponent />
      <div className="container">
        <table className="table">
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
              <label className="check">
              <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id, task.completed)}
                  />
              </label>
              <th className={`task-list${task.completed ? ' completed' : ''}`}>{task.title}</th>
              <th className="buttons">
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
                <button className="update-btn" onClick={() => handleEditClick(task)} >Update</button>
              </th>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedTask && (
        <ModalForm
          show={showModal}
          handleClose={handleClose}
          task={selectedTask}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default ListTaskComponent;
