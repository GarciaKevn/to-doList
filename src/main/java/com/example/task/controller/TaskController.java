package com.example.task.controller;

import com.example.task.entity.Task;
import com.example.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.UUID;

@CrossOrigin( origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("tasks")
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task request){
        return new ResponseEntity<>(taskService.createTask(request), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Collection<Task>> getAllTasks(){
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable UUID taskId){
        return ResponseEntity.ok(taskService.getTaskById(taskId));
    }

    @PatchMapping("/{taskId}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable UUID taskId, @RequestBody Task request){
        taskService.updateStatus(taskId, request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Void> updateTask(@PathVariable UUID taskId, @RequestBody Task request){
        taskService.updateTask(taskId, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID taskId){
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
}
