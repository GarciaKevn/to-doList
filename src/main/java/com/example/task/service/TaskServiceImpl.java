package com.example.task.service;

import com.example.task.entity.Task;
import com.example.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    @Override
    public Task createTask(Task request) {
        UUID id = UUID.randomUUID();
        request.setId(id);
        request.setCompleted(false);
        Task savedTask = taskRepository.save(request);
        return savedTask;
    }

    @Override
    public Collection<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Task getTaskById(UUID id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.get();
    }

    @Override
    public void updateStatus(UUID id, Task request) {
        Optional<Task> existingTask = taskRepository.findById(id);
        Task task = existingTask.get();
        task.setCompleted(request.isCompleted());
        taskRepository.save(task);
    }

    @Override
    public void updateTask(UUID id, Task request) {
        Task task = taskRepository.findById(id).get();
        task.setTitle(request.getTitle());
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(UUID id) {
        Task task = taskRepository.findById(id).get();
        taskRepository.delete(task);
    }
}
