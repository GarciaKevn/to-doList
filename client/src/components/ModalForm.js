import React from "react";
import Button from "react-bootstrap/Button";
import { useState, useEffect  } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TaskService from "../services/TaskService";

export const ModalForm = ({ show, handleClose, task, onUpdate }) => {
  const [title, setTitle] = useState(task ? task.title : "");

  useEffect(() => {
    setTitle(task ? task.title : "");
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title };

    TaskService.updateTask(updatedTask)
      .then((response) => {
        onUpdate(updatedTask);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTaskTitle" className="form-group">
              
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="save-btn" onClick={handleSubmit} >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose} className="close-btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalForm;
