import axios from "axios"

const TASK_BASE_REST_API_URL = "http://localhost:8080/tasks";

class TaskService {
    
    getAllTasks(){
        return axios.get(TASK_BASE_REST_API_URL);
    }

    createTask(title){
        return axios.post(TASK_BASE_REST_API_URL,title);
    }

    deleteTask(taskId) {
        return axios.delete(`${TASK_BASE_REST_API_URL}/${taskId}`);
      }

    updateTask(updatedTaskData) {
        return axios.put(`${TASK_BASE_REST_API_URL}/${updatedTaskData.id}`, updatedTaskData);
     }
    
    updateStatus(taskId, updatedTaskData) {
      return axios.patch(`${TASK_BASE_REST_API_URL}/${taskId}/status`, updatedTaskData);
   }
}

export default new TaskService();