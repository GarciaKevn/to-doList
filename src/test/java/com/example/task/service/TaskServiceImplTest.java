package com.example.task.service;

import com.example.task.entity.Task;
import com.example.task.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {
    @InjectMocks
    private TaskServiceImpl taskService;

    @Mock
    private TaskRepository taskRepository;


    @Test
    void createTask() {
        // Given
        Task request = new Task();
        request.setTitle("work");

        Task savedTask = new Task();
        savedTask.setId(UUID.randomUUID());
        savedTask.setCompleted(false);

        when(taskRepository.save(request)).thenReturn(savedTask);

        // When
        Task result = taskService.createTask(request);

        // Then
        assertNotNull(result);
        assertEquals(savedTask.getId(), result.getId());
        assertEquals(savedTask.getTitle(), result.getTitle());
        assertFalse(result.isCompleted());
        verify(taskRepository).save(request);
    }
}