package com.example.task.service;

import com.example.task.entity.Task;

import java.util.Collection;
import java.util.UUID;

public interface TaskService {

    Task createTask(Task request);

    Collection<Task> getAllTasks();

    Task getTaskById(UUID id);

    void updateStatus(UUID id, Task request);

    void updateTask(UUID id, Task request);

     void deleteTask(UUID id);
}
